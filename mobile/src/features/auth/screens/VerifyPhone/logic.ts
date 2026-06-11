import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';

import { appAlert as Alert } from '../../../../shared/services/appAlert';

const CODE_LENGTH = 6;
const COUNTDOWN_SECONDS = 60;

export function useVerifyPhone() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const userId = route.params?.userId;
  const phone = route.params?.phone || '';

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill(''),
  );

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const [isVerifying, setIsVerifying] = useState(false);
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

  const handleVerifyPhone = async () => {
    if (!isCodeComplete) {
      Alert.alert('Missing Code', 'Please enter the 6-digit verification code.');
      return;
    }

    if (secondsLeft <= 0) {
      Alert.alert('Code Expired', 'The verification code has expired. Please resend a new code.');
      return;
    }

    try {
      setIsVerifying(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/verify-phone-code.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            code,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Phone Verified',
          'Your phone number has been verified successfully. You can now login.',
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
        Alert.alert('Verification failed', data.message || 'Invalid code.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while verifying phone number.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!userId || !phone) {
      Alert.alert('Error', 'User data is missing.');
      return;
    }

    try {
      setIsResending(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/resend-phone-code.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            phone,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCodeDigits(Array(CODE_LENGTH).fill(''));

        Alert.alert(
          'New Demo SMS Code',
          `Your new verification code is:\n\n${data.demoCode}`,
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
      Alert.alert('Error', 'Something went wrong while generating a new code.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formattedCountdown = `00:${String(secondsLeft).padStart(2, '0')}`;

  return {
    phone,
    codeDigits,
    inputRefs,
    secondsLeft,
    formattedCountdown,
    isCodeComplete,
    isVerifying,
    isResending,
    handleCodeChange,
    handleCodeKeyPress,
    handleResendCode,
    handleVerifyPhone,
    handleGoBack,
  };
}