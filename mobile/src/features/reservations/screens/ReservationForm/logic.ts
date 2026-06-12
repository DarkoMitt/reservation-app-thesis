import { useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const MIN_RESERVATION_BUFFER_MINUTES = 30;
const OPENING_BUFFER_MINUTES = 180;
const CLOSING_BUFFER_MINUTES = 180;

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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

const parseWorkingHours = (hours?: string) => {
  if (!hours || hours === 'Closed' || !hours.includes('-')) return null;

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

const getWorkingHoursForDate = (restaurant: any, date: Date) => {
  const day = date.getDay();

  if (day === 0) return restaurant?.sunday_hours;
  if (day === 1) return restaurant?.monday_hours;
  if (day === 2) return restaurant?.tuesday_hours;
  if (day === 3) return restaurant?.wednesday_hours;
  if (day === 4) return restaurant?.thursday_hours;
  if (day === 5) return restaurant?.friday_hours;
  if (day === 6) return restaurant?.saturday_hours;

  return restaurant?.working_hours;
};

const getAllowedReservationWindow = (restaurant: any, date: Date) => {
  const hours = getWorkingHoursForDate(restaurant, date);
  const parsedHours = parseWorkingHours(hours);

  if (!parsedHours) return null;

  const startMinutes = timeToMinutes(parsedHours.start);
  let endMinutes = timeToMinutes(parsedHours.end);

  if (startMinutes >= endMinutes) {
    endMinutes += 24 * 60;
  }

  const allowedStart = startMinutes + OPENING_BUFFER_MINUTES;
  const allowedEnd = endMinutes - CLOSING_BUFFER_MINUTES;

  if (allowedStart > allowedEnd) return null;

  return {
    allowedStart,
    allowedEnd,
  };
};

const getSelectedTimeMinutesForWindow = (selectedTime: Date, restaurant: any, selectedDate: Date) => {
  const hours = getWorkingHoursForDate(restaurant, selectedDate);
  const parsedHours = parseWorkingHours(hours);

  if (!parsedHours) return null;

  const startMinutes = timeToMinutes(parsedHours.start);
  const endMinutes = timeToMinutes(parsedHours.end);
  let selectedMinutes = selectedTime.getHours() * 60 + selectedTime.getMinutes();

  if (startMinutes >= endMinutes && selectedMinutes < startMinutes) {
    selectedMinutes += 24 * 60;
  }

  return selectedMinutes;
};

const formatWindowTime = (minutes: number) => {
  const normalizedMinutes = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

const validateRestaurantWorkingHoursForReservation = (
  restaurant: any,
  selectedDate: Date,
  selectedTime: Date,
) => {
  const hours = getWorkingHoursForDate(restaurant, selectedDate);

  if (!hours || hours === 'Closed') {
    return {
      valid: false,
      message: 'This restaurant is closed on the selected day.',
    };
  }

  const window = getAllowedReservationWindow(restaurant, selectedDate);
  const selectedMinutes = getSelectedTimeMinutesForWindow(
    selectedTime,
    restaurant,
    selectedDate,
  );

  if (!window || selectedMinutes === null) {
    return {
      valid: false,
      message:
        'Reservations are not available for the selected day because the working hours are too short or unavailable.',
    };
  }

  if (
    selectedMinutes < window.allowedStart ||
    selectedMinutes > window.allowedEnd
  ) {
    return {
      valid: false,
      message: `Reservation time must be between ${formatWindowTime(
        window.allowedStart,
      )} and ${formatWindowTime(
        window.allowedEnd,
      )} for the selected day.`,
    };
  }

  return {
    valid: true,
    message: '',
  };
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

    const selectedDayHours = getWorkingHoursForDate(restaurant, pickedDate);

    if (!selectedDayHours || selectedDayHours === 'Closed') {
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableGuests(null);

      Alert.alert(
        'Restaurant Closed',
        'This restaurant is closed on the selected day.',
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

      const workingHoursValidation =
        validateRestaurantWorkingHoursForReservation(
          restaurant,
          date,
          selectedTime,
        );

      if (!workingHoursValidation.valid) {
        setSelectedTime(null);
        setAvailableGuests(null);

        Alert.alert('Invalid Time', workingHoursValidation.message);
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

    const workingHoursValidation = validateRestaurantWorkingHoursForReservation(
      restaurant,
      selectedDate,
      date,
    );

    if (!workingHoursValidation.valid) {
      Alert.alert('Invalid Time', workingHoursValidation.message);
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

      const workingHoursValidation =
        validateRestaurantWorkingHoursForReservation(
          restaurant,
          selectedDate,
          selectedTime,
        );

      if (!workingHoursValidation.valid) {
        Alert.alert('Invalid Reservation Time', workingHoursValidation.message);
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
        if (data.status === 'waitlisted') {
          Alert.alert(
            'Added to Waitlist',
            data.message ||
              'The restaurant is full for this time slot. Your request has been added to the waitlist.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        } else {
          Alert.alert(
            'Reservation Sent',
            data.message || 'Reservation request sent successfully.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        }
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