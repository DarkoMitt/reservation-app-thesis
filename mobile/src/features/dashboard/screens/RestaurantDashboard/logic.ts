import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

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

export function useRestaurantDashboard() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const user = route.params?.user;

  const [restaurant, setRestaurant] =
    useState<RestaurantProfile | null>(null);

  const [isLoading, setIsLoading] = useState(false);

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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setRestaurant(data.restaurant);
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to load restaurant profile.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while loading restaurant profile.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProfile = () => {
    if (!restaurant) {
      Alert.alert(
        'Error',
        'Restaurant profile is not loaded yet.',
      );

      return;
    }

    navigation.dispatch(
      CommonActions.navigate({
        name: 'RestaurantProfile',
        params: {
          restaurant,
        },
      }),
    );
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  };

  useEffect(() => {
    fetchRestaurantProfile();
  }, []);

  return {
    user,
    restaurant,
    isLoading,
    fetchRestaurantProfile,
    handleOpenProfile,
    handleLogout,
  };
}