import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function useForgotPassword() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = async () => {
    if (!email.trim()) {
      Alert.alert('Missing Email', 'Please enter your email.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/request-password-reset.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Demo Verification Code',
          `Your verification code is:\n\n${data.demo_code}`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('ResetPassword', {
                  email: email.trim(),
                });
              },
            },
          ],
        );
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to generate verification code.',
        );
      }
    } catch {
      Alert.alert(
        'Error',
        'Something went wrong while generating the verification code.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    email,
    setEmail,
    isSubmitting,
    handleSendCode,
    handleGoBack,
  };
}