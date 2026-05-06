import { useState } from 'react';
import { Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

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

      if (!data.success) {
        Alert.alert(
          'Login failed',
          data.message || 'Invalid credentials.',
        );
        return;
      }

      const user = data.user;

      if (user.role === 'customer') {
        navigation.dispatch(
  CommonActions.navigate({
    name: 'Main',
    params: {
      screen: 'CustomerDashboard',
    },
  }),
);

        return;
      }

      if (user.role === 'restaurant') {
        if (user.status === 'pending') {
          Alert.alert(
            'Pending approval',
            'Your restaurant account is waiting for admin approval.',
          );

          return;
        }

        navigation.dispatch(
  CommonActions.navigate({
    name: 'Main',
    params: {
      screen: 'RestaurantDashboard',
    },
  }),
);

        return;
      }

      if (user.role === 'admin') {
        navigation.dispatch(
  CommonActions.navigate({
    name: 'Main',
    params: {
      screen: 'AdminDashboard',
    },
  }),
);

        return;
      }

      Alert.alert('Error', 'Unknown user role.');
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong. Check your connection.',
      );
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