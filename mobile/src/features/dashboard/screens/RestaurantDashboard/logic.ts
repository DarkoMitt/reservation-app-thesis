import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';

type RestaurantProfile = {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_type: string;
  cuisine_type: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  max_guests: number;
  working_hours: string;
  status: string;
  rejection_reason: string | null;
  email: string;
};

type ReservationRequest = {
  id: number;
  customer_user_id: number;
  restaurant_id: number;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  status: string;
  no_show_risk: string;
  trust_score: number;
  special_request: string | null;
  created_at: string;
  full_name: string;
  email: string;
};

export function useRestaurantDashboard() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const [restaurant, setRestaurant] = useState<RestaurantProfile | null>(null);
  const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [isUpdatingRequest, setIsUpdatingRequest] = useState(false);

  const fetchRestaurantProfile = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User data is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/restaurant/get-restaurant-profile.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setRestaurant(data.restaurant);
        fetchReservationRequests(data.restaurant.restaurant_id);
      } else {
        Alert.alert('Error', data.message || 'Failed to load restaurant profile.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while loading restaurant profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReservationRequests = async (restaurantId?: number) => {
    const targetRestaurantId = restaurantId || restaurant?.restaurant_id;

    if (!targetRestaurantId) {
      return;
    }

    try {
      setIsLoadingRequests(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/get-restaurant-requests.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: targetRestaurantId,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setReservationRequests(data.requests || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load reservation requests.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while loading reservation requests.');
    } finally {
      setIsLoadingRequests(false);
    }
  };

  const updateReservationStatus = async (
    reservationId: number,
    status: 'approved' | 'rejected',
  ) => {
    try {
      setIsUpdatingRequest(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/update-reservation-status.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationId,
            status,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Success',
          status === 'approved'
            ? 'Reservation approved successfully.'
            : 'Reservation rejected successfully.',
        );

        fetchReservationRequests();
      } else {
        Alert.alert('Error', data.message || 'Failed to update reservation.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating reservation.');
    } finally {
      setIsUpdatingRequest(false);
    }
  };

  const handleApproveReservation = (reservationId: number) => {
    updateReservationStatus(reservationId, 'approved');
  };

  const handleRejectReservation = (reservationId: number) => {
    Alert.alert(
      'Reject Reservation',
      'Are you sure you want to reject this reservation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => updateReservationStatus(reservationId, 'rejected'),
        },
      ],
    );
  };

  const handleBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  };

  const handleOpenProfile = () => {
    if (!restaurant) {
      Alert.alert('Error', 'Restaurant profile is not loaded yet.');
      return;
    }

    navigation.navigate('RestaurantProfile', {
      restaurant,
      user,
    });
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  };

  useEffect(() => {
    fetchRestaurantProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRestaurantProfile();
    }, [user?.id]),
  );

  const pendingRequests = reservationRequests.filter(
    request => request.status === 'pending',
  );

  return {
    user,
    restaurant,
    reservationRequests,
    pendingRequests,
    isLoading,
    isLoadingRequests,
    isUpdatingRequest,
    fetchRestaurantProfile,
    fetchReservationRequests,
    handleBack,
    handleOpenProfile,
    handleLogout,
    handleApproveReservation,
    handleRejectReservation,
  };
}