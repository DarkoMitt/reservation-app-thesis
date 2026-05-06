import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function useLogin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/login.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailOrPhone: email.trim(),
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', `Welcome, ${data.user.first_name}!`);
      } else {
        Alert.alert('Login failed', data.message || 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Check your connection.');
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('ChooseRole' as never);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleGoToRegister,
  };
}