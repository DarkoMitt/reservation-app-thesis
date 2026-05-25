import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from './types';

import CustomerDashboard from '../../features/dashboard/screens/CustomerDashboard';
import RestaurantDashboard from '../../features/dashboard/screens/RestaurantDashboard';
import AdminDashboard from '../../features/dashboard/screens/AdminDashboard';
import RestaurantProfile from '../../features/dashboard/screens/RestaurantProfile';
import RestaurantDetails from '../../features/dashboard/screens/RestaurantDetails';
import ReservationForm from '../../features/reservations/screens/ReservationForm';
import MyReservations from '../../features/reservations/screens/MyReservations';
import ReservationDetails from '../../features/reservations/screens/ReservationDetails';
import CustomerProfile from '../../features/dashboard/screens/CustomerProfile';
import VisitedCustomers from '../../features/dashboard/screens/VisitedCustomers';
import CustomerPublicProfile from '../../features/dashboard/screens/CustomerPublicProfile';

import MyReviews from '../../features/reviews/screens/MyReviews';
import RestaurantReviews from '../../features/reviews/screens/RestaurantReviews';

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
      <Stack.Screen name="RestaurantDashboard" component={RestaurantDashboard} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="ReservationForm" component={ReservationForm} />
      <Stack.Screen name="MyReservations" component={MyReservations} />
      <Stack.Screen name="ReservationDetails" component={ReservationDetails} />
      <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
      <Stack.Screen name="VisitedCustomers" component={VisitedCustomers} />
      <Stack.Screen name="CustomerPublicProfile" component={CustomerPublicProfile} />

      <Stack.Screen name="MyReviews" component={MyReviews} />
      <Stack.Screen name="RestaurantReviews" component={RestaurantReviews} />
    </Stack.Navigator>
  );
}

export default MainNavigator;