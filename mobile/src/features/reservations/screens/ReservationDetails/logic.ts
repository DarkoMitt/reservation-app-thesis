import { useCallback, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
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

  const [isChangeFormOpen, setIsChangeFormOpen] = useState(false);
  const [changeDate, setChangeDate] = useState('');
  const [changeTime, setChangeTime] = useState('');
  const [changeGuestsCount, setChangeGuestsCount] = useState('');
  const [customerChangeReason, setCustomerChangeReason] = useState('');
  const [isSubmittingCustomerChange, setIsSubmittingCustomerChange] = useState(false);

  const [isChangeDatePickerOpen, setIsChangeDatePickerOpen] = useState(false);
  const [isChangeTimePickerOpen, setIsChangeTimePickerOpen] = useState(false);
  const [changeDatePickerValue, setChangeDatePickerValue] = useState(new Date());
  const [changeTimePickerValue, setChangeTimePickerValue] = useState(new Date());

  const reservationDateTime = getReservationDateTime(reservation);
  const now = new Date();

  const isExpiredReservation = reservation?.status === 'expired';

  const isPastReservation =
    isExpiredReservation ||
    reservation?.display_status === 'Expired' ||
    reservation?.display_status === 'Completed' ||
    reservation?.display_status === 'No-show' ||
    reservationDateTime < now;

  const canCancelReservation =
    !isPastReservation &&
    (reservation?.status === 'pending' ||
      reservation?.status === 'approved' ||
      reservation?.status === 'waitlisted');

  const canRequestReservationChange =
    !isPastReservation &&
    (reservation?.status === 'pending' || reservation?.status === 'approved');

  const customerChangeButtonLabel =
    reservation?.status === 'pending' ? 'Edit Reservation' : 'Request Change';

  const canRateRestaurant =
    reservation?.status === 'visited' && !customerToRestaurantRating;

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

  const openChangeDatePicker = () => {
    if (changeDate) {
      const parsedDate = new Date(changeDate);
      if (!Number.isNaN(parsedDate.getTime())) {
        setChangeDatePickerValue(parsedDate);
      }
    }

    setIsChangeDatePickerOpen(true);
  };

  const openChangeTimePicker = () => {
    if (changeTime) {
      const [hours, minutes] = changeTime.split(':').map(Number);
      const date = new Date();

      date.setHours(Number.isNaN(hours) ? 9 : hours);
      date.setMinutes(Number.isNaN(minutes) ? 0 : minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);

      setChangeTimePickerValue(date);
    }

    setIsChangeTimePickerOpen(true);
  };

  const handleChangeDatePickerChange = (_event: any, selectedDate?: Date) => {
    setIsChangeDatePickerOpen(false);

    if (!selectedDate) return;

    setChangeDatePickerValue(selectedDate);
    setChangeDate(formatDateForApi(selectedDate));
  };

  const handleChangeTimePickerChange = (_event: any, selectedDate?: Date) => {
    setIsChangeTimePickerOpen(false);

    if (!selectedDate) return;

    setChangeTimePickerValue(selectedDate);
    setChangeTime(formatTimeForApi(selectedDate));
  };

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

  const handleOpenCustomerChangeForm = () => {
    setChangeDate(reservation?.reservation_date || '');
    setChangeTime(reservation?.reservation_time?.slice(0, 5) || '');
    setChangeGuestsCount(String(reservation?.guests_count || ''));
    setCustomerChangeReason('');

    if (reservation?.reservation_date) {
      const parsedDate = new Date(reservation.reservation_date);
      if (!Number.isNaN(parsedDate.getTime())) {
        setChangeDatePickerValue(parsedDate);
      }
    }

    if (reservation?.reservation_time) {
      const [hours, minutes] = reservation.reservation_time.slice(0, 5).split(':').map(Number);
      const timeDate = new Date();

      timeDate.setHours(Number.isNaN(hours) ? 9 : hours);
      timeDate.setMinutes(Number.isNaN(minutes) ? 0 : minutes);
      timeDate.setSeconds(0);
      timeDate.setMilliseconds(0);

      setChangeTimePickerValue(timeDate);
    }

    setIsChangeFormOpen(true);
  };

  const handleCancelCustomerChangeForm = () => {
    setIsChangeFormOpen(false);
    setChangeDate('');
    setChangeTime('');
    setChangeGuestsCount('');
    setCustomerChangeReason('');
    setIsChangeDatePickerOpen(false);
    setIsChangeTimePickerOpen(false);
  };

  const submitCustomerChangeRequest = async () => {
    if (!changeDate || !changeTime || !changeGuestsCount || !customerChangeReason.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter date, time, guests count and reason.',
      );
      return;
    }

    if (Number(changeGuestsCount) <= 0) {
      Alert.alert('Invalid Guests', 'Guests count must be greater than 0.');
      return;
    }

    try {
      setIsSubmittingCustomerChange(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/request-customer-change.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reservationId: reservation.id,
            customerUserId: user.id,
            suggestedDate: changeDate,
            suggestedTime: changeTime,
            suggestedGuestsCount: Number(changeGuestsCount),
            changeReason: customerChangeReason.trim(),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', data.message, [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Failed to request reservation change.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while requesting reservation change.');
    } finally {
      setIsSubmittingCustomerChange(false);
    }
  };

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
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                'http://10.0.2.2/reservation-api/reservations/cancel-reservation.php',
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    reservationId: reservation.id,
                    cancellationReason: 'Cancelled by customer.',
                  }),
                },
              );

              const data = await response.json();

              if (data.success) {
                Alert.alert(
                  'Reservation Cancelled',
                  data.trustPenalty > 0
                    ? `Reservation cancelled successfully. Trust penalty: -${data.trustPenalty}`
                    : 'Reservation cancelled successfully.',
                  [{ text: 'OK', onPress: () => navigation.goBack() }],
                );
              } else {
                Alert.alert('Error', data.message || 'Failed to cancel reservation.');
              }
            } catch {
              Alert.alert('Error', 'Something went wrong while cancelling reservation.');
            }
          },
        },
      ],
    );
  };

  const handleAcceptChange = () => {
    Alert.alert(
      'Accept Suggested Change',
      'Are you sure you want to accept the restaurant suggested changes?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Accept',
          onPress: async () => {
            try {
              const response = await fetch(
                'http://10.0.2.2/reservation-api/reservations/respond-change-request.php',
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    reservationId: reservation.id,
                    action: 'accept',
                  }),
                },
              );

              const data = await response.json();

              if (data.success) {
                Alert.alert('Success', data.message, [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert('Error', data.message || 'Failed to accept change.');
              }
            } catch {
              Alert.alert('Error', 'Something went wrong while accepting change.');
            }
          },
        },
      ],
    );
  };

  const handleRejectChange = () => {
    Alert.alert(
      'Reject Suggested Change',
      'Are you sure you want to reject the restaurant suggested changes?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                'http://10.0.2.2/reservation-api/reservations/respond-change-request.php',
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    reservationId: reservation.id,
                    action: 'reject',
                  }),
                },
              );

              const data = await response.json();

              if (data.success) {
                Alert.alert('Success', data.message, [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert('Error', data.message || 'Failed to reject change.');
              }
            } catch {
              Alert.alert('Error', 'Something went wrong while rejecting change.');
            }
          },
        },
      ],
    );
  };

  return {
    reservation,
    isPastReservation,
    isExpiredReservation,
    canCancelReservation,
    canRequestReservationChange,
    customerChangeButtonLabel,

    isChangeFormOpen,
    changeDate,
    setChangeDate,
    changeTime,
    setChangeTime,
    changeGuestsCount,
    setChangeGuestsCount,
    customerChangeReason,
    setCustomerChangeReason,
    isSubmittingCustomerChange,
    handleOpenCustomerChangeForm,
    handleCancelCustomerChangeForm,
    submitCustomerChangeRequest,

    isChangeDatePickerOpen,
    isChangeTimePickerOpen,
    changeDatePickerValue,
    changeTimePickerValue,
    openChangeDatePicker,
    openChangeTimePicker,
    handleChangeDatePickerChange,
    handleChangeTimePickerChange,

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