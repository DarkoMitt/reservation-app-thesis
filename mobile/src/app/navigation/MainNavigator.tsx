import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from './types';

import CustomerDashboard from '../../features/dashboard/screens/CustomerDashboard';
import RestaurantDashboard from '../../features/dashboard/screens/RestaurantDashboard';
import AdminDashboard from '../../features/dashboard/screens/AdminDashboard';
import RestaurantProfile from '../../features/dashboard/screens/RestaurantProfile';
import RestaurantDetails from '../../features/dashboard/screens/RestaurantDetails';
import ReservationForm from '../../features/reservations/screens/ReservationForm';

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

      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfile}
      />

      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
      />

      <Stack.Screen
        name="ReservationForm"
        component={ReservationForm}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;