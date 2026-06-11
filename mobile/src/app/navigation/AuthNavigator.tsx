import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from './types';

import ChooseRoleScreen from '../../features/auth/screens/ChooseRole';
import CustomerRegisterScreen from '../../features/auth/screens/CustomerRegister';
import RestaurantRegisterScreen from '../../features/auth/screens/RestaurantRegister';
import Login from '../../features/auth/screens/Login';
import ForgotPassword from '../../features/auth/screens/ForgotPassword';
import ResetPassword from '../../features/auth/screens/ResetPassword';

import VerifyPhoneScreen from '../../features/auth/screens/VerifyPhone';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegisterScreen} />
      <Stack.Screen name="RestaurantRegister" component={RestaurantRegisterScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;