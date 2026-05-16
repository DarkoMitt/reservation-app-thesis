import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const getReservationDateTime = (reservation: any) => {
  return new Date(
    `${reservation.reservation_date}T${reservation.reservation_time}`,
  );
};

export function useReservationDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const reservation = route.params?.reservation;
  const user = route.params?.user;

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
      'Cancellation functionality will be connected next.',
    );
  };

  const handleAcceptChange = () => {
    Alert.alert(
      'Accept Change',
      'Accept change functionality will be connected next.',
    );
  };

  const handleRejectChange = () => {
    Alert.alert(
      'Reject Change',
      'Reject change functionality will be connected next.',
    );
  };

  return {
    reservation,
    isPastReservation,
    canCancelReservation,
    handleGoBack,
    handleOpenRestaurant,
    handleCancelReservation,
    handleAcceptChange,
    handleRejectChange,
  };
}