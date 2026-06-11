import { useCallback, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type RatingSummary = {
  total_reviews: number;
  overall_rating: number;
  food_rating: number;
  service_rating: number;
  atmosphere_rating: number;
  most_common_price_per_person: number | null;
};

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

const parseImages = (value?: string): string[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

const parseWorkingHours = (hours?: string) => {
  if (!hours || !hours.includes('-')) return null;

  const [startRaw, endRaw] = hours.split('-');

  return {
    start: startRaw.trim(),
    end: endRaw.trim(),
  };
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isRestaurantOpenNow = (restaurant: any) => {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const hours =
    day >= 1 && day <= 4
      ? restaurant?.mon_thu_hours
      : restaurant?.fri_sun_hours;

  const parsedHours = parseWorkingHours(hours);

  if (!parsedHours) return false;

  const startMinutes = timeToMinutes(parsedHours.start);
  const endMinutes = timeToMinutes(parsedHours.end);

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
};

export function useRestaurantDetails() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const restaurant = route.params?.restaurant;
  const user = route.params?.user;

  const restaurantImages = parseImages(restaurant?.restaurant_images);
  const menuImages = parseImages(restaurant?.menu_images);

  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);

  const [activeReservation, setActiveReservation] =
    useState<CustomerReservation | null>(null);

  const [lastRejectedReservation, setLastRejectedReservation] =
    useState<CustomerReservation | null>(null);

  const [ratingSummary, setRatingSummary] =
    useState<RatingSummary | null>(null);

  const [showRatingDetails, setShowRatingDetails] = useState(false);
  const [isLoadingReservation, setIsLoadingReservation] = useState(false);
  const [isRespondingChange, setIsRespondingChange] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const fetchRatingSummary = async () => {
    if (!restaurant?.id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-restaurant-rating-summary.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: restaurant.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setRatingSummary(data.summary);
      }
    } catch {
      setRatingSummary(null);
    }
  };

  const fetchReservationStatus = async () => {
    if (!restaurant?.id || !user?.id) return;

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
        Alert.alert('Error', data.message || 'Failed to load reservation status.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading reservation status.');
    } finally {
      setIsLoadingReservation(false);
    }
  };

  const fetchFavoriteStatus = async () => {
    if (!restaurant?.id || !user?.id) {
      return;
    }

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/favorites/get-favorites.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerUserId: user.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setIsFavorite(
          (data.favoriteRestaurantIds || []).includes(
            Number(restaurant.id),
          ),
        );
      }
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      fetchRatingSummary();
      fetchReservationStatus();
      fetchFavoriteStatus();
    }, [restaurant?.id, user?.id]),
  );

  const handleGoBack = () => {
    navigation.navigate('CustomerDashboard', { user });
  };

  const handleReserve = () => {
    navigation.navigate('ReservationForm', {
      restaurant,
      user,
    });
  };

  const handleOpenImagePreview = (imageUri: string) => {
    setPreviewImageUri(imageUri);
  };

  const handleCloseImagePreview = () => {
    setPreviewImageUri(null);
  };

  const handleToggleFavorite = async () => {
    if (!restaurant?.id || !user?.id) {
      return;
    }

    try {
      setIsTogglingFavorite(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/favorites/toggle-favorite.php',
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
        setIsFavorite(data.isFavorite);
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to update favorites.',
        );
      }
    } catch {
      Alert.alert(
        'Error',
        'Something went wrong while updating favorites.',
      );
    } finally {
      setIsTogglingFavorite(false);
    }
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
    } catch {
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

  const reservationStatusLabel = getStatusLabel(activeReservation?.status);
  const rejectedStatusLabel = getStatusLabel(lastRejectedReservation?.status);
  const isOpenNow = isRestaurantOpenNow(restaurant);

  return {
    restaurant,
    user,
    restaurantImages,
    menuImages,
    previewImageUri,
    activeReservation,
    lastRejectedReservation,
    ratingSummary,
    showRatingDetails,
    setShowRatingDetails,
    isLoadingReservation,
    isRespondingChange,
    reservationStatusLabel,
    rejectedStatusLabel,
    handleGoBack,
    handleReserve,
    handleOpenImagePreview,
    handleCloseImagePreview,
    handleAcceptChange,
    handleRejectChange,

    isFavorite,
    isTogglingFavorite,
    handleToggleFavorite,
    isOpenNow,
  };
}