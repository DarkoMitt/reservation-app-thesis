import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import {
  AppAlertButton,
  AppAlertConfig,
  appAlert,
} from '../../services/appAlert';
import { styles } from './styles';

const getVariantIcon = (variant?: string) => {
  if (variant === 'success') return '✓';
  if (variant === 'error') return '!';
  if (variant === 'warning') return '!';
  if (variant === 'confirm') return '?';

  return 'i';
};

function AppModalAlert(): React.JSX.Element {
  const [config, setConfig] = useState<AppAlertConfig>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    variant: 'info',
  });

  useEffect(() => {
    appAlert.setHandler(setConfig);
  }, []);

  const closeModal = () => {
    setConfig(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const buttons: AppAlertButton[] =
    config.buttons && config.buttons.length > 0
      ? config.buttons
      : [{ text: 'OK' }];

  const handleButtonPress = (button: AppAlertButton) => {
    closeModal();

    setTimeout(() => {
      button.onPress?.();
    }, 180);
  };

  return (
    <Modal
      visible={config.visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>
              {getVariantIcon(config.variant)}
            </Text>
          </View>

          <Text style={styles.title}>{config.title}</Text>

          {config.message ? (
            <Text style={styles.message}>{config.message}</Text>
          ) : null}

          <View style={styles.buttonsRow}>
            {buttons.map((button, index) => {
              const isDestructive = button.style === 'destructive';
              const isCancel = button.style === 'cancel';
              const isPrimary =
                !isCancel || buttons.length === 1;

              return (
                <TouchableOpacity
                  key={`${button.text}-${index}`}
                  activeOpacity={0.85}
                  style={[
                    styles.button,
                    isPrimary && styles.primaryButton,
                    isCancel && styles.cancelButton,
                    isDestructive && styles.destructiveButton,
                  ]}
                  onPress={() => handleButtonPress(button)}>
                  <Text
                    style={[
                      styles.buttonText,
                      isPrimary && styles.primaryButtonText,
                      isCancel && styles.cancelButtonText,
                      isDestructive && styles.destructiveButtonText,
                    ]}>
                    {button.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AppModalAlert;