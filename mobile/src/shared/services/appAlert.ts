export type AppAlertButton = {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
};

export type AppAlertVariant =
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'confirm';

export type AppAlertConfig = {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AppAlertButton[];
  variant?: AppAlertVariant;
};

let alertHandler: ((config: AppAlertConfig) => void) | null = null;

const detectVariant = (
  title: string,
  message?: string,
  buttons?: AppAlertButton[],
  variant?: AppAlertVariant,
): AppAlertVariant => {
  if (variant) {
    return variant;
  }

  const titleValue = title.toLowerCase();
  const messageValue = (message || '').toLowerCase();

  const hasDestructiveButton = buttons?.some(
    button => button.style === 'destructive',
  );

  const hasCancelButton = buttons?.some(
    button => button.style === 'cancel',
  );

  if (
    hasDestructiveButton ||
    titleValue.includes('logout') ||
    titleValue.includes('delete') ||
    titleValue.includes('cancel reservation') ||
    titleValue.includes('reject') ||
    titleValue.includes('no-show') ||
    messageValue.includes('are you sure')
  ) {
    return 'confirm';
  }

  if (
    titleValue.includes('success') ||
    titleValue.includes('approved') ||
    titleValue.includes('completed') ||
    titleValue.includes('submitted') ||
    titleValue.includes('sent') ||
    titleValue.includes('reset') ||
    messageValue.includes('successfully')
  ) {
    return 'success';
  }

  if (
    titleValue.includes('error') ||
    titleValue.includes('failed') ||
    titleValue.includes('invalid') ||
    titleValue.includes('missing') ||
    titleValue.includes('mismatch') ||
    messageValue.includes('failed') ||
    messageValue.includes('invalid') ||
    messageValue.includes('missing') ||
    messageValue.includes('wrong')
  ) {
    return 'error';
  }

  if (
    titleValue.includes('warning') ||
    titleValue.includes('banned') ||
    titleValue.includes('expired') ||
    titleValue.includes('not allowed') ||
    titleValue.includes('required') ||
    messageValue.includes('expired') ||
    messageValue.includes('banned') ||
    messageValue.includes('required') ||
    messageValue.includes('cannot')
  ) {
    return 'warning';
  }

  if (hasCancelButton && buttons && buttons.length > 1) {
    return 'confirm';
  }

  return 'info';
};

export const appAlert = {
  setHandler: (handler: (config: AppAlertConfig) => void) => {
    alertHandler = handler;
  },

  alert: (
    title: string,
    message?: string,
    buttons?: AppAlertButton[],
    variant?: AppAlertVariant,
  ) => {
    if (alertHandler) {
      alertHandler({
        visible: true,
        title,
        message,
        buttons,
        variant: detectVariant(title, message, buttons, variant),
      });
    }
  },
};