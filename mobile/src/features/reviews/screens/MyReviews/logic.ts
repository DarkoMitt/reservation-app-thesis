import { useEffect, useMemo, useState } from 'react';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { appAlert as Alert } from '../../../../shared/services/appAlert';

type Review = {
  id: number;
  reservation_id: number;
  overall_rating: number;
  food_rating: number;
  service_rating: number;
  atmosphere_rating: number;
  review_text: string | null;
  price_per_person: number | null;
  created_at: string;
  restaurant_id: number;
  restaurant_name: string;
  city: string;
  address: string;
};

export function useMyReviews() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyReviews = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User data is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-my-reviews.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load reviews.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenHome = () => {
    navigation.navigate('CustomerDashboard', {
      user,
    });
  };

  const handleOpenMyReservations = () => {
    navigation.navigate('MyReservations', {
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
        onPress: handleOpenMyReservations,
      },
      {
        key: 'reviews',
        label: 'Reviews',
        icon: '★',
        isActive: true,
        onPress: () => {},
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

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return {
    reviews,
    isLoading,
    handleBack,
    bottomNavItems,
  };
}