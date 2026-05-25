import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const getReservationDateTime = (reservation: any) => {
  return new Date(`${reservation.reservation_date}T${reservation.reservation_time}`);
};

export function useReservationDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const reservation = route.params?.reservation;
  const user = route.params?.user;

  const [customerToRestaurantRating, setCustomerToRestaurantRating] = useState<any>(null);
  const [restaurantToCustomerRating, setRestaurantToCustomerRating] = useState<any>(null);

  const [foodRating, setFoodRating] = useState('');
  const [serviceRating, setServiceRating] = useState('');
  const [atmosphereRating, setAtmosphereRating] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const reservationDateTime = getReservationDateTime(reservation);
  const now = new Date();

  const isPastReservation =
    reservation?.display_status === 'Expired' ||
    reservation?.display_status === 'Completed' ||
    reservation?.display_status === 'No-show' ||
    reservationDateTime < now;

  const canCancelReservation =
    !isPastReservation &&
    (reservation?.status === 'pending' || reservation?.status === 'approved');

  const canRateRestaurant =
    reservation?.status === 'visited' && !customerToRestaurantRating;

  const fetchRatings = async () => {
    if (!reservation?.id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-reservation-ratings.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reservationId: reservation.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCustomerToRestaurantRating(data.customerToRestaurant);
        setRestaurantToCustomerRating(data.restaurantToCustomer);
      }
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      fetchRatings();
    }, [reservation?.id]),
  );

  const submitCustomerRating = async () => {
    if (!foodRating || !serviceRating || !atmosphereRating) {
      Alert.alert(
        'Missing Rating',
        'Please select food, service and atmosphere rating.',
      );
      return;
    }

    try {
      setIsSubmittingRating(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/submit-rating.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reservationId: reservation.id,
            reviewerUserId: user.id,
            ratingType: 'customer_to_restaurant',
            foodRating: Number(foodRating),
            serviceRating: Number(serviceRating),
            atmosphereRating: Number(atmosphereRating),
            pricePerPerson:
              pricePerPerson === '6000+'
                ? 6000
                : pricePerPerson
                  ? Number(pricePerPerson)
                  : null,
            reviewText,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Rating submitted successfully.');

        setFoodRating('');
        setServiceRating('');
        setAtmosphereRating('');
        setPricePerPerson('');
        setReviewText('');

        fetchRatings();
      } else {
        Alert.alert('Error', data.message || 'Failed to submit rating.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while submitting rating.');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenRestaurant = () => {
    navigation.navigate('RestaurantDetails', {
      restaurant: {
        id: reservation.restaurant_id,
        restaurant_name: reservation.restaurant_name,
        city: reservation.city,
        address: reservation.address,
        cuisine_type: reservation.cuisine_type,
      },
      user,
    });
  };

  const handleCancelReservation = () => {
    Alert.alert('Cancel Reservation', 'Cancellation functionality will be connected next.');
  };

  const handleAcceptChange = () => {
    Alert.alert('Accept Change', 'Accept change functionality will be connected next.');
  };

  const handleRejectChange = () => {
    Alert.alert('Reject Change', 'Reject change functionality will be connected next.');
  };

  return {
    reservation,
    isPastReservation,
    canCancelReservation,

    customerToRestaurantRating,
    restaurantToCustomerRating,
    canRateRestaurant,

    foodRating,
    setFoodRating,
    serviceRating,
    setServiceRating,
    atmosphereRating,
    setAtmosphereRating,
    pricePerPerson,
    setPricePerPerson,
    reviewText,
    setReviewText,
    isSubmittingRating,
    submitCustomerRating,

    handleGoBack,
    handleOpenRestaurant,
    handleCancelReservation,
    handleAcceptChange,
    handleRejectChange,
  };
}