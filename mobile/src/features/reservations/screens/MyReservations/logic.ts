import { useCallback, useMemo, useState } from 'react';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { appAlert as Alert } from '../../../../shared/services/appAlert';

type Reservation = {
  id: number;
  restaurant_id: number;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  status: string;
  special_request: string | null;
  rejection_reason: string | null;
  cancellation_reason: string | null;
  suggested_date: string | null;
  suggested_time: string | null;
  suggested_guests_count: number | null;
  change_reason: string | null;
  change_expires_at: string | null;
  restaurant_name: string;
  city: string;
  address: string;
  cuisine_type: string;
  display_status?: string;
  reservation_category?: string;
  waitlist_position?: number;
};

const filters = [
  'All',
  'Upcoming',
  'Pending',
  'Changes',
  'Expired',
  'Rejected',
  'Cancelled',
  'Past',
  'Waitlisted',
];

const activeUpcomingStatuses = ['approved', 'pending', 'change_requested'];

const getReservationDateTime = (reservation: Reservation) => {
  return new Date(
    `${reservation.reservation_date}T${reservation.reservation_time}`,
  );
};

const isFutureReservation = (reservation: Reservation) => {
  return getReservationDateTime(reservation) >= new Date();
};

const getDisplayStatus = (reservation: Reservation) => {
  if (reservation.status === 'expired') {
    return 'Expired';
  }

  if (reservation.status === 'visited') {
    return 'Completed';
  }

  if (reservation.status === 'no_show') {
    return 'No-show';
  }

  if (reservation.status === 'change_requested') {
    return 'Change Requested';
  }

  if (reservation.status === 'waitlisted') {
    return 'Waitlisted';
  }

  if (reservation.status === 'rejected') {
    return 'Rejected';
  }

  if (reservation.status === 'cancelled') {
    return 'Cancelled';
  }

  if (reservation.status === 'approved') {
    return isFutureReservation(reservation) ? 'Approved' : 'Expired';
  }

  if (reservation.status === 'pending') {
    return isFutureReservation(reservation) ? 'Pending' : 'Expired';
  }

  return reservation.status;
};

const getReservationCategory = (reservation: Reservation) => {
  if (reservation.status === 'expired') {
    return 'Expired reservation';
  }

  if (reservation.status === 'rejected') {
    return 'Rejected reservation';
  }

  if (reservation.status === 'cancelled') {
    return 'Cancelled reservation';
  }

  if (reservation.status === 'visited') {
    return 'Past reservation';
  }

  if (reservation.status === 'no_show') {
    return 'Past reservation';
  }

  if (isFutureReservation(reservation)) {
    return 'Active / upcoming';
  }

  return 'Past reservation';
};

export function useMyReservations() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const fetchReservations = async () => {
    if (!user?.id) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/get-customer-reservations.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerUserId: user.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setReservations(data.reservations || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load reservations.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading reservations.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReservations();
    }, [user?.id]),
  );

  const reservationsWithDisplayStatus = reservations.map(reservation => ({
    ...reservation,
    display_status: getDisplayStatus(reservation),
    reservation_category: getReservationCategory(reservation),
  }));

  const filteredReservations = reservationsWithDisplayStatus.filter(
    reservation => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        reservation.restaurant_name?.toLowerCase().includes(searchValue) ||
        reservation.city?.toLowerCase().includes(searchValue) ||
        reservation.address?.toLowerCase().includes(searchValue) ||
        reservation.status?.toLowerCase().includes(searchValue) ||
        reservation.display_status?.toLowerCase().includes(searchValue);

      if (!matchesSearch) {
        return false;
      }

      if (selectedFilter === 'All') {
        return true;
      }

      if (selectedFilter === 'Upcoming') {
        return (
          isFutureReservation(reservation) &&
          activeUpcomingStatuses.includes(reservation.status)
        );
      }

      if (selectedFilter === 'Past') {
        return (
          reservation.reservation_category === 'Past reservation' &&
          !['expired', 'rejected', 'cancelled'].includes(reservation.status)
        );
      }

      if (selectedFilter === 'Expired') {
        return reservation.status === 'expired';
      }

      if (selectedFilter === 'Pending') {
        return reservation.status === 'pending';
      }

      if (selectedFilter === 'Changes') {
        return reservation.status === 'change_requested';
      }

      if (selectedFilter === 'Rejected') {
        return reservation.status === 'rejected';
      }

      if (selectedFilter === 'Cancelled') {
        return reservation.status === 'cancelled';
      }

      if (selectedFilter === 'Waitlisted') {
        return reservation.status === 'waitlisted';
      }

      return true;
    },
  );

  const handleGoBack = () => {
    navigation.navigate('CustomerDashboard', {
      user,
    });
  };

  const handleOpenReservation = (reservation: Reservation) => {
    navigation.navigate('ReservationDetails', {
      reservation,
      user,
    });
  };

  const handleOpenHome = () => {
    navigation.navigate('CustomerDashboard', {
      user,
    });
  };

  const handleOpenMyReviews = () => {
    navigation.navigate('MyReviews', {
      user,
    });
  };

  const handleOpenProfile = () => {
    navigation.navigate('CustomerProfile', {
      user,
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              }),
            );
          },
        },
      ],
    );
  };

  const bottomNavItems = useMemo(
    () => [
      {
        key: 'home',
        label: 'Home',
        icon: '⌂',
        onPress: handleOpenHome,
      },
      {
        key: 'reservations',
        label: 'Reservations',
        icon: '◷',
        isActive: true,
        onPress: () => {},
      },
      {
        key: 'reviews',
        label: 'Reviews',
        icon: '★',
        onPress: handleOpenMyReviews,
      },
      {
        key: 'profile',
        label: 'Profile',
        icon: '◉',
        onPress: handleOpenProfile,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: '↩',
        onPress: handleLogout,
      },
    ],
    [user],
  );

  return {
    filters,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    reservations: filteredReservations,
    isLoading,
    handleGoBack,
    handleOpenReservation,
    bottomNavItems,
  };
}