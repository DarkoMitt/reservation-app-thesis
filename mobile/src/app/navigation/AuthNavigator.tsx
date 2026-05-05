import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import CustomerRegisterScreen from '../../features/auth/screens/CustomerRegister';

import ChooseRoleScreen from '../../features/auth/screens/ChooseRole';

// привремено placeholders
import { View, Text } from 'react-native';

const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
);

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegisterScreen} />
      <Stack.Screen name="RestaurantRegister">
        {() => <Placeholder title="Restaurant Register" />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {() => <Placeholder title="Login" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthNavigator;