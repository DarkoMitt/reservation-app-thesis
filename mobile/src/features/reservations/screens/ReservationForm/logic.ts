import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const MIN_RESERVATION_BUFFER_MINUTES = 30;

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const formatTime = (date: Date) => {
  return date.toTimeString().slice(0, 5);
};

const isSameDay = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

const getReservationDateTime = (date: Date, time: Date) => {
  const reservationDateTime = new Date(date);

  reservationDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

  return reservationDateTime;
};

export function useReservationForm() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const restaurant = route.params?.restaurant;
  const user = route.params?.user;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [guestsCount, setGuestsCount] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [availableGuests, setAvailableGuests] = useState<number | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const reservationDate = selectedDate ? formatDate(selectedDate) : '';
  const reservationTime = selectedTime ? formatTime(selectedTime) : '';

  const handleGoBack = () => {
    navigation.navigate('RestaurantDetails', {
      restaurant,
      user,
    });
  };

  const checkAvailability = async (date: string, time: string) => {
    if (!restaurant?.id) {
      return;
    }

    try {
      setIsCheckingAvailability(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/check-availability.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: restaurant.id,
            reservationDate: date,
            reservationTime: `${time}:00`,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setAvailableGuests(data.availableGuests);
      } else {
        setAvailableGuests(null);
      }
    } catch (error) {
      console.log('Availability error:', error);
      setAvailableGuests(null);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleOpenTimePicker = () => {
    if (!selectedDate) {
      Alert.alert(
        'Select Date First',
        'Please select a reservation date before choosing time.',
      );
      return;
    }

    setShowTimePicker(true);
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);

    if (event.type === 'dismissed' || !date) {
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickedDate = new Date(date);
    pickedDate.setHours(0, 0, 0, 0);

    if (pickedDate < today) {
      Alert.alert(
        'Invalid Date',
        'You cannot create a reservation for a past date.',
      );
      return;
    }

    setSelectedDate(date);
    setAvailableGuests(null);

    if (selectedTime) {
      const now = new Date();
      const minimumAllowedTime = new Date(
        now.getTime() + MIN_RESERVATION_BUFFER_MINUTES * 60 * 1000,
      );

      const reservationDateTime = getReservationDateTime(date, selectedTime);

      if (isSameDay(date, now) && reservationDateTime < minimumAllowedTime) {
        setSelectedTime(null);

        Alert.alert(
          'Invalid Time',
          `For today's reservations, please select a time at least ${MIN_RESERVATION_BUFFER_MINUTES} minutes from now.`,
        );

        return;
      }

      checkAvailability(formatDate(date), formatTime(selectedTime));
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowTimePicker(false);

    if (event.type === 'dismissed' || !date) {
      return;
    }

    if (!selectedDate) {
      Alert.alert(
        'Select Date First',
        'Please select a reservation date before choosing time.',
      );
      return;
    }

    const now = new Date();
    const minimumAllowedTime = new Date(
      now.getTime() + MIN_RESERVATION_BUFFER_MINUTES * 60 * 1000,
    );

    const reservationDateTime = getReservationDateTime(selectedDate, date);

    if (
      isSameDay(selectedDate, now) &&
      reservationDateTime < minimumAllowedTime
    ) {
      Alert.alert(
        'Invalid Time',
        `For today's reservations, please select a time at least ${MIN_RESERVATION_BUFFER_MINUTES} minutes from now.`,
      );
      return;
    }

    setSelectedTime(date);

    checkAvailability(formatDate(selectedDate), formatTime(date));
  };

  const handleSubmit = async () => {
    if (!reservationDate || !reservationTime || !guestsCount) {
      Alert.alert(
        'Missing Information',
        'Please enter date, time and number of guests.',
      );
      return;
    }

    if (Number(guestsCount) <= 0) {
      Alert.alert(
        'Invalid Guests',
        'Number of guests must be greater than 0.',
      );
      return;
    }

    if (
      availableGuests !== null &&
      Number(guestsCount) > availableGuests
    ) {
      Alert.alert(
        'Not Enough Capacity',
        `Only ${availableGuests} seats are currently available for this time slot.`,
      );
      return;
    }

    if (selectedDate && selectedTime) {
      const now = new Date();
      const minimumAllowedTime = new Date(
        now.getTime() + MIN_RESERVATION_BUFFER_MINUTES * 60 * 1000,
      );

      const reservationDateTime = getReservationDateTime(
        selectedDate,
        selectedTime,
      );

      if (reservationDateTime < minimumAllowedTime) {
        Alert.alert(
          'Invalid Reservation Time',
          `Reservations must be made at least ${MIN_RESERVATION_BUFFER_MINUTES} minutes in advance.`,
        );
        return;
      }
    }

    if (!restaurant?.id || !user?.id) {
      Alert.alert('Error', 'Reservation data is missing.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/create-reservation.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerUserId: user.id,
            restaurantId: restaurant.id,
            reservationDate,
            reservationTime,
            guestsCount: Number(guestsCount),
            specialRequest,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Reservation Sent',
          'Your reservation request has been sent to the restaurant.',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('CustomerDashboard', {
                  user,
                }),
            },
          ],
        );
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to send reservation request.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while sending reservation request.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    restaurant,
    reservationDate,
    reservationTime,
    selectedDate,
    selectedTime,
    showDatePicker,
    showTimePicker,
    guestsCount,
    setGuestsCount,
    specialRequest,
    setSpecialRequest,
    isSubmitting,
    availableGuests,
    isCheckingAvailability,
    handleGoBack,
    handleOpenDatePicker,
    handleOpenTimePicker,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  };
}