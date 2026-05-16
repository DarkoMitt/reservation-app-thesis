import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type CustomerReservation = {
  id: number;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  status: string;
  no_show_risk: string;
  trust_score: number;
  special_request: string | null;
  created_at: string;
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case 'pending':
      return 'Reservation Pending';
    case 'approved':
      return 'Reservation Approved';
    case 'change_requested':
      return 'Restaurant Suggested Changes';
    default:
      return 'Reservation Status';
  }
};

export function useRestaurantDetails() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const restaurant = route.params?.restaurant;
  const user = route.params?.user;

  const [activeReservation, setActiveReservation] =
    useState<CustomerReservation | null>(null);

  const [isLoadingReservation, setIsLoadingReservation] =
    useState(false);

  const fetchActiveReservation = async () => {
    if (!restaurant?.id || !user?.id) {
      return;
    }

    try {
      setIsLoadingReservation(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/get-customer-restaurant-reservation.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerUserId: user.id,
            restaurantId: restaurant.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setActiveReservation(data.reservation);
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to load reservation status.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while loading reservation status.',
      );
    } finally {
      setIsLoadingReservation(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchActiveReservation();
    }, [restaurant?.id, user?.id]),
  );

  const handleGoBack = () => {
    navigation.navigate('CustomerDashboard', {
      user,
    });
  };

  const handleReserve = () => {
    navigation.navigate('ReservationForm', {
      restaurant,
      user,
    });
  };

  const reservationStatusLabel = getStatusLabel(
    activeReservation?.status,
  );

  return {
    restaurant,
    user,
    activeReservation,
    isLoadingReservation,
    reservationStatusLabel,
    handleGoBack,
    handleReserve,
  };
}