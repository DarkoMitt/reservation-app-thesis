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
  rejection_reason: string | null;
  suggested_date?: string | null;
  suggested_time?: string | null;
  suggested_guests_count?: number | null;
  change_reason?: string | null;
  change_expires_at?: string | null;
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
    case 'rejected':
      return 'Reservation Rejected';
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

  const [lastRejectedReservation, setLastRejectedReservation] =
    useState<CustomerReservation | null>(null);

  const [isLoadingReservation, setIsLoadingReservation] = useState(false);
  const [isRespondingChange, setIsRespondingChange] = useState(false);
  const [isCancellingReservation, setIsCancellingReservation] = useState(false);

  const [isCancelBoxOpen, setIsCancelBoxOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  const fetchReservationStatus = async () => {
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
        setActiveReservation(data.activeReservation);
        setLastRejectedReservation(data.lastRejectedReservation);
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
      fetchReservationStatus();
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

  const respondToChangeRequest = async (action: 'accept' | 'reject') => {
    if (!activeReservation?.id) {
      Alert.alert('Error', 'Reservation data is missing.');
      return;
    }

    try {
      setIsRespondingChange(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/respond-change-request.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationId: activeReservation.id,
            action,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Success',
          action === 'accept'
            ? 'Suggested changes accepted.'
            : 'Suggested changes rejected.',
        );

        fetchReservationStatus();
      } else {
        Alert.alert('Error', data.message || 'Failed to respond to changes.');
        fetchReservationStatus();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while responding to changes.');
    } finally {
      setIsRespondingChange(false);
    }
  };

  const handleAcceptChange = () => {
    respondToChangeRequest('accept');
  };

  const handleRejectChange = () => {
    Alert.alert(
      'Reject Suggested Changes',
      'Are you sure you want to reject the suggested changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => respondToChangeRequest('reject'),
        },
      ],
    );
  };

  const handleOpenCancelBox = () => {
    setIsCancelBoxOpen(true);
    setCancellationReason('');
  };

  const handleCloseCancelBox = () => {
    setIsCancelBoxOpen(false);
    setCancellationReason('');
  };

  const handleCancelReservation = async () => {
    if (!activeReservation?.id) {
      Alert.alert('Error', 'Reservation data is missing.');
      return;
    }

    try {
      setIsCancellingReservation(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/cancel-reservation.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationId: activeReservation.id,
            cancellationReason,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Reservation cancelled successfully.');

        setIsCancelBoxOpen(false);
        setCancellationReason('');
        fetchReservationStatus();
      } else {
        Alert.alert(
          'Cannot Cancel Reservation',
          data.message || 'Failed to cancel reservation.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while cancelling reservation.',
      );
    } finally {
      setIsCancellingReservation(false);
    }
  };

  const reservationStatusLabel = getStatusLabel(activeReservation?.status);
  const rejectedStatusLabel = getStatusLabel(lastRejectedReservation?.status);

  return {
    restaurant,
    user,
    activeReservation,
    lastRejectedReservation,
    isLoadingReservation,
    isRespondingChange,
    isCancellingReservation,
    isCancelBoxOpen,
    cancellationReason,
    setCancellationReason,
    reservationStatusLabel,
    rejectedStatusLabel,
    handleGoBack,
    handleReserve,
    handleAcceptChange,
    handleRejectChange,
    handleOpenCancelBox,
    handleCloseCancelBox,
    handleCancelReservation,
  };
}