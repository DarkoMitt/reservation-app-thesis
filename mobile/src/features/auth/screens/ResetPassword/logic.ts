import { useEffect, useRef, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import { TextInput } from 'react-native';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';

const CODE_LENGTH = 6;
const COUNTDOWN_SECONDS = 60;

export function useResetPassword() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const email = route.params?.email || '';

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill(''),
  );

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isResetting, setIsResetting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const code = codeDigits.join('');
  const isCodeComplete = code.length === CODE_LENGTH && !codeDigits.includes('');

  useEffect(() => {
    if (!isCountdownActive) return;

    if (secondsLeft <= 0) {
      setIsCountdownActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, isCountdownActive]);

  const resetCountdown = () => {
    setSecondsLeft(COUNTDOWN_SECONDS);
    setIsCountdownActive(true);
  };

  const handleCodeChange = (value: string, index: number) => {
    const cleanedValue = value.replace(/[^0-9]/g, '');

    if (cleanedValue.length > 1) {
      const pastedDigits = cleanedValue.slice(0, CODE_LENGTH).split('');
      const nextDigits = Array(CODE_LENGTH).fill('');

      pastedDigits.forEach((digit, digitIndex) => {
        nextDigits[digitIndex] = digit;
      });

      setCodeDigits(nextDigits);

      const focusIndex = Math.min(pastedDigits.length, CODE_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();

      return;
    }

    const nextDigits = [...codeDigits];
    nextDigits[index] = cleanedValue;

    setCodeDigits(nextDigits);

    if (cleanedValue && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (key: string, index: number) => {
    if (key !== 'Backspace') return;

    if (codeDigits[index]) {
      const nextDigits = [...codeDigits];
      nextDigits[index] = '';
      setCodeDigits(nextDigits);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();

      const nextDigits = [...codeDigits];
      nextDigits[index - 1] = '';
      setCodeDigits(nextDigits);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Email data is missing.');
      return;
    }

    try {
      setIsResending(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/request-password-reset.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCodeDigits(Array(CODE_LENGTH).fill(''));

        Alert.alert(
          'New Demo Verification Code',
          `Your new verification code is:\n\n${data.demo_code}`,
          [
            {
              text: 'OK',
              onPress: () => {
                resetCountdown();
                inputRefs.current[0]?.focus();
              },
            },
          ],
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to resend code.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while resending code.');
    } finally {
      setIsResending(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isCodeComplete) {
      Alert.alert('Missing Code', 'Please enter the 6-digit verification code.');
      return;
    }

    if (secondsLeft <= 0) {
      Alert.alert('Code Expired', 'The verification code has expired. Please resend a new code.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert('Missing Password', 'Please enter and confirm your new password.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setIsResetting(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/reset-password.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            code,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Password Reset',
          'Your password has been reset successfully. You can now login with your new password.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  }),
                );
              },
            },
          ],
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to reset password.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while resetting password.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formattedCountdown = `00:${String(secondsLeft).padStart(2, '0')}`;

  return {
    email,
    codeDigits,
    inputRefs,
    secondsLeft,
    formattedCountdown,
    isCodeComplete,

    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,

    isResetting,
    isResending,

    handleCodeChange,
    handleCodeKeyPress,
    handleResendCode,
    handleResetPassword,
    handleGoBack,
  };
}