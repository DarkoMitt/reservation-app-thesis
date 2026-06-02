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
  risk_percentage?: number;
  prediction_factors?: string[];
  prediction_explanation?: string | null;
  prediction_updated_at?: string | null;
  trust_score: number;
  special_request: string | null;
  rejection_reason?: string | null;
  created_at: string;
  full_name: string;
  email: string;
  customer_trust_score?: number;
  customer_no_show_count?: number;
  customer_total_reservations?: number;
  waitlist_position?: number;
  is_new_customer?: number;
  has_restaurant_customer_rating?: number;
};

const isPastApprovedReservation = (request: ReservationRequest) => {
  const reservationDateTime = new Date(
    `${request.reservation_date}T${request.reservation_time}`,
  );

  return request.status === 'approved' && reservationDateTime < new Date();
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

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [selectedRejectRequestId, setSelectedRejectRequestId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [selectedChangeRequestId, setSelectedChangeRequestId] = useState<number | null>(null);
  const [suggestedDate, setSuggestedDate] = useState('');
  const [suggestedTime, setSuggestedTime] = useState('');

  const [isSuggestedDatePickerOpen, setIsSuggestedDatePickerOpen] = useState(false);
  const [isSuggestedTimePickerOpen, setIsSuggestedTimePickerOpen] = useState(false);

  const [suggestedDatePickerValue, setSuggestedDatePickerValue] = useState(new Date());
  const [suggestedTimePickerValue, setSuggestedTimePickerValue] = useState(new Date());

  const formatDateForApi = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatTimeForApi = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const openSuggestedDatePicker = () => {
    if (suggestedDate) {
      const parsedDate = new Date(suggestedDate);

      if (!Number.isNaN(parsedDate.getTime())) {
        setSuggestedDatePickerValue(parsedDate);
      }
    }

    setIsSuggestedDatePickerOpen(true);
  };

  const openSuggestedTimePicker = () => {
    if (suggestedTime) {
      const [hours, minutes] = suggestedTime.split(':').map(Number);
      const date = new Date();

      date.setHours(Number.isNaN(hours) ? 9 : hours);
      date.setMinutes(Number.isNaN(minutes) ? 0 : minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);

      setSuggestedTimePickerValue(date);
    }

    setIsSuggestedTimePickerOpen(true);
  };

  const handleSuggestedDatePickerChange = (_event: any, selectedDate?: Date) => {
    setIsSuggestedDatePickerOpen(false);

    if (!selectedDate) return;

    setSuggestedDatePickerValue(selectedDate);
    setSuggestedDate(formatDateForApi(selectedDate));
  };

  const handleSuggestedTimePickerChange = (_event: any, selectedDate?: Date) => {
    setIsSuggestedTimePickerOpen(false);

    if (!selectedDate) return;

    setSuggestedTimePickerValue(selectedDate);
    setSuggestedTime(formatTimeForApi(selectedDate));
  };

  const [suggestedGuestsCount, setSuggestedGuestsCount] = useState('');
  const [changeReason, setChangeReason] = useState('');

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  const restaurantInitial =
    restaurant?.restaurant_name?.charAt(0)?.toUpperCase() || 'R';

  const generateNotifications = async () => {
    try {
      await fetch(
        'http://10.0.2.2/reservation-api/notifications/generate-notifications.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } catch {}
  };

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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setRestaurant(data.restaurant);
        fetchReservationRequests(data.restaurant.restaurant_id);
      } else {
        Alert.alert('Error', data.message || 'Failed to load restaurant profile.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading restaurant profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReservationRequests = async (restaurantId?: number) => {
    const targetRestaurantId = restaurantId || restaurant?.restaurant_id;
    if (!targetRestaurantId) return;

    try {
      setIsLoadingRequests(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/get-restaurant-requests.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId: targetRestaurantId }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setReservationRequests(data.requests || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load reservation requests.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading reservation requests.');
    } finally {
      setIsLoadingRequests(false);
    }
  };

  const updateReservationStatus = async (
    reservationId: number,
    status: 'approved' | 'rejected' | 'change_requested' | 'visited' | 'no_show',
    options?: {
      rejectionReason?: string;
      suggestedDate?: string;
      suggestedTime?: string;
      suggestedGuestsCount?: string;
      changeReason?: string;
    },
  ) => {
    try {
      setIsUpdatingRequest(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/update-reservation-status.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reservationId,
            status,
            rejectionReason: options?.rejectionReason || '',
            suggestedDate: options?.suggestedDate || '',
            suggestedTime: options?.suggestedTime || '',
            suggestedGuestsCount: options?.suggestedGuestsCount || '',
            changeReason: options?.changeReason || '',
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Reservation updated successfully.');

        setSelectedRejectRequestId(null);
        setRejectionReason('');
        setSelectedChangeRequestId(null);
        setSuggestedDate('');
        setSuggestedTime('');
        setSuggestedGuestsCount('');
        setChangeReason('');

        fetchReservationRequests();
      } else {
        Alert.alert('Error', data.message || 'Failed to update reservation.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while updating reservation.');
    } finally {
      setIsUpdatingRequest(false);
    }
  };

  const handleApproveReservation = (reservationId: number) => {
    updateReservationStatus(reservationId, 'approved');
  };

  const handleMarkVisited = (reservationId: number) => {
    updateReservationStatus(reservationId, 'visited');
  };

  const handleMarkNoShow = (reservationId: number) => {
    Alert.alert('Mark as No-show', 'Are you sure this customer did not arrive?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Mark No-show',
        style: 'destructive',
        onPress: () => updateReservationStatus(reservationId, 'no_show'),
      },
    ]);
  };

  const handleRejectReservation = (reservationId: number) => {
    setSelectedChangeRequestId(null);
    setSelectedRejectRequestId(reservationId);
    setRejectionReason('');
  };

  const handleCancelReject = () => {
    setSelectedRejectRequestId(null);
    setRejectionReason('');
  };

  const handleConfirmReject = () => {
    if (!selectedRejectRequestId) return;

    if (!rejectionReason.trim()) {
      Alert.alert('Reason Required', 'Please enter a reason before rejecting this reservation.');
      return;
    }

    updateReservationStatus(selectedRejectRequestId, 'rejected', {
      rejectionReason: rejectionReason.trim(),
    });
  };

  const handleOfferChange = (request: ReservationRequest) => {
    setSelectedRejectRequestId(null);
    setSelectedChangeRequestId(request.id);
    setSuggestedDate(request.reservation_date);
    setSuggestedTime(request.reservation_time?.slice(0, 5) || '');
    setSuggestedGuestsCount(String(request.guests_count));
    setChangeReason('');
  };

  const handleCancelChange = () => {
    setSelectedChangeRequestId(null);
    setSuggestedDate('');
    setSuggestedTime('');
    setSuggestedGuestsCount('');
    setChangeReason('');
  };

  const handleConfirmChange = () => {
    if (!selectedChangeRequestId) return;

    if (!suggestedDate || !suggestedTime || !suggestedGuestsCount || !changeReason.trim()) {
      Alert.alert('Missing Information', 'Please enter suggested date, time, guests count and reason.');
      return;
    }

    if (Number(suggestedGuestsCount) <= 0) {
      Alert.alert('Invalid Guests', 'Suggested guests count must be greater than 0.');
      return;
    }

    updateReservationStatus(selectedChangeRequestId, 'change_requested', {
      suggestedDate,
      suggestedTime,
      suggestedGuestsCount,
      changeReason: changeReason.trim(),
    });
  };

  const fetchUnreadNotificationsCount = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/notifications/get-notifications.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setUnreadNotificationsCount(Number(data.unread_count || 0));
      }
    } catch {}
  };

  const handleOpenNotifications = () => {
    navigation.navigate('Notifications', {
      user,
    });
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
    setIsProfileMenuOpen(false);

    if (!restaurant) {
      Alert.alert('Error', 'Restaurant profile is not loaded yet.');
      return;
    }

    navigation.navigate('RestaurantProfile', {
      restaurant,
      user,
    });
  };

  const handleOpenVisitedCustomers = () => {
    setIsProfileMenuOpen(false);

    if (!restaurant) {
      Alert.alert('Error', 'Restaurant profile is not loaded yet.');
      return;
    }

    navigation.navigate('VisitedCustomers', {
      restaurant,
      user,
    });
  };

  const handleOpenRestaurantReviews = () => {
    setIsProfileMenuOpen(false);

    if (!restaurant) {
      Alert.alert('Error', 'Restaurant profile is not loaded yet.');
      return;
    }

    navigation.navigate('RestaurantReviews', {
      restaurant,
      user,
    });
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  };

  useFocusEffect(
  React.useCallback(() => {
    generateNotifications();

    fetchRestaurantProfile();
    fetchUnreadNotificationsCount();
  }, [user?.id]),
);

  const pendingRequests = reservationRequests.filter(
    request => request.status === 'pending',
  );

  const waitlistedRequests = reservationRequests.filter(
    request => request.status === 'waitlisted',
  );

  const pastApprovedRequests = reservationRequests.filter(
    request => isPastApprovedReservation(request),
  );

  const handleOpenCustomerProfile = (customerUserId: number) => {
    navigation.navigate('CustomerPublicProfile', {
      customerUserId,
      user,
    });
  };

  const handleOpenPredictionDetails = (reservation: ReservationRequest) => {
    navigation.navigate('PredictionDetails', {
      reservation,
    });
  };

  return {
    restaurant,
    pendingRequests,
    waitlistedRequests,
    pastApprovedRequests,
    isLoading,
    isLoadingRequests,
    isUpdatingRequest,

    isProfileMenuOpen,
    setIsProfileMenuOpen,
    restaurantInitial,
    handleOpenVisitedCustomers,

    selectedRejectRequestId,
    rejectionReason,
    setRejectionReason,
    handleRejectReservation,
    handleCancelReject,
    handleConfirmReject,

    selectedChangeRequestId,
    suggestedDate,
    isSuggestedDatePickerOpen,
    isSuggestedTimePickerOpen,
    suggestedDatePickerValue,
    suggestedTimePickerValue,
    openSuggestedDatePicker,
    openSuggestedTimePicker,
    handleSuggestedDatePickerChange,
    handleSuggestedTimePickerChange,
    setSuggestedDate,
    suggestedTime,
    setSuggestedTime,
    suggestedGuestsCount,
    setSuggestedGuestsCount,
    changeReason,
    setChangeReason,
    handleOfferChange,
    handleCancelChange,
    handleConfirmChange,

    handleBack,
    handleOpenProfile,
    handleOpenRestaurantReviews,
    handleLogout,
    handleApproveReservation,
    handleMarkVisited,
    handleMarkNoShow,
    handleOpenCustomerProfile,
    handleOpenPredictionDetails,
    unreadNotificationsCount,
    handleOpenNotifications,
  };
}