import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type Restaurant = {
  id: number;
  restaurant_name: string;
  restaurant_type: string;
  cuisine_type: string;
  city: string;
  address: string;
  phone: string;
  description: string;
  max_guests: number;
  working_hours: string;
  mon_thu_hours?: string;
  fri_sun_hours?: string;
  has_smoking_area?: number;
  has_outdoor_seating?: number;
  has_parking?: number;
  has_wifi?: number;
  restaurant_images?: string;
  menu_images?: string;
  status: string;
  email: string;
  average_rating?: number;
  total_reviews?: number;
  current_reserved_guests?: number;
  displayStatus?: string;
};

const parseWorkingHours = (hours?: string) => {
  if (!hours || !hours.includes('-')) {
    return null;
  }

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

const isRestaurantOpenNow = (restaurant: Restaurant) => {
  const now = new Date();
  const day = now.getDay();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const hours =
    day >= 1 && day <= 4
      ? restaurant.mon_thu_hours
      : restaurant.fri_sun_hours;

  const parsedHours = parseWorkingHours(hours);

  if (!parsedHours) {
    return false;
  }

  const startMinutes = timeToMinutes(parsedHours.start);
  const endMinutes = timeToMinutes(parsedHours.end);

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
};

const getRestaurantDisplayStatus = (restaurant: Restaurant) => {
  const isOpen = isRestaurantOpenNow(restaurant);

  if (!isOpen) {
    return '🔴 Closed';
  }

  const reservedGuests = Number(restaurant.current_reserved_guests || 0);
  const maxGuests = Number(restaurant.max_guests || 0);

  if (maxGuests > 0 && reservedGuests >= maxGuests) {
    return '🔴 Fully booked';
  }

  if (maxGuests > 0 && reservedGuests / maxGuests >= 0.7) {
    return '🟠 Busy';
  }

  return '🟢 Open now';
};

export function useCustomerDashboard() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : 'Customer';

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
    : 'CU';

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Best Match');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);

  const filters = [
    'Best Match',
    'Open Now',
    'Highest Rated',
    'Most Visited',
    'Nearest',
    'Trending',
  ];

  const fetchRestaurants = async () => {
    try {
      setIsLoadingRestaurants(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/restaurant/get-approved-restaurants.php',
      );

      const data = await response.json();

      if (data.success) {
        const restaurantsWithStatus = (data.restaurants || []).map(
          (restaurant: Restaurant) => ({
            ...restaurant,
            displayStatus: getRestaurantDisplayStatus(restaurant),
          }),
        );

        setRestaurants(restaurantsWithStatus);
      } else {
        Alert.alert('Error', data.message || 'Failed to load restaurants.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while loading restaurants.');
    } finally {
      setIsLoadingRestaurants(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const searchValue = search.toLowerCase().trim();

      if (!searchValue) {
        return true;
      }

      return (
        restaurant.restaurant_name?.toLowerCase().includes(searchValue) ||
        restaurant.city?.toLowerCase().includes(searchValue) ||
        restaurant.address?.toLowerCase().includes(searchValue) ||
        restaurant.cuisine_type?.toLowerCase().includes(searchValue) ||
        restaurant.restaurant_type?.toLowerCase().includes(searchValue)
      );
    })
    .filter(restaurant => {
      if (selectedFilter === 'Open Now') {
        return restaurant.displayStatus === '🟢 Open now';
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === 'Highest Rated') {
        return Number(b.average_rating || 0) - Number(a.average_rating || 0);
      }

      return 0;
    });

  const handleOpenRestaurant = (restaurant: Restaurant) => {
    navigation.navigate('RestaurantDetails', {
      restaurant,
      user,
    });
  };

  const handleOpenMyReservations = () => {
    setIsProfileMenuOpen(false);

    navigation.navigate('MyReservations', {
      user,
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
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
    ]);
  };

  return {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filters,
    restaurants: filteredRestaurants,
    isLoadingRestaurants,
    handleLogout,
    fullName,
    initials,
    handleOpenRestaurant,
    handleOpenMyReservations,
  };
}