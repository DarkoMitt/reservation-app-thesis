import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from './types';

import CustomerDashboard from '../../features/dashboard/screens/CustomerDashboard';
import RestaurantDashboard from '../../features/dashboard/screens/RestaurantDashboard';
import AdminDashboard from '../../features/dashboard/screens/AdminDashboard';

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerDashboard"
        component={CustomerDashboard}
      />

      <Stack.Screen
        name="RestaurantDashboard"
        component={RestaurantDashboard}
      />

      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;