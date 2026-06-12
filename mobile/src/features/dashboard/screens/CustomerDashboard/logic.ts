import { useCallback, useEffect, useMemo, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import {
  CommonActions,
  useFocusEffect,
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
  monday_hours?: string;
  tuesday_hours?: string;
  wednesday_hours?: string;
  thursday_hours?: string;
  friday_hours?: string;
  saturday_hours?: string;
  sunday_hours?: string;
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
  match_score?: number;
  visit_count?: number;
  trending_score?: number;
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

const getTodayWorkingHours = (restaurant: Restaurant) => {
  const day = new Date().getDay();

  if (day === 0) return restaurant.sunday_hours;
  if (day === 1) return restaurant.monday_hours;
  if (day === 2) return restaurant.tuesday_hours;
  if (day === 3) return restaurant.wednesday_hours;
  if (day === 4) return restaurant.thursday_hours;
  if (day === 5) return restaurant.friday_hours;
  if (day === 6) return restaurant.saturday_hours;

  return restaurant.working_hours;
};

const isRestaurantOpenNow = (restaurant: Restaurant) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayHours = getTodayWorkingHours(restaurant);
  const parsedHours = parseWorkingHours(todayHours);

  if (!parsedHours) return false;

  const startMinutes = timeToMinutes(parsedHours.start);
  const endMinutes = timeToMinutes(parsedHours.end);

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
};

const getRestaurantDisplayStatus = (restaurant: Restaurant) => {
  const isOpen = isRestaurantOpenNow(restaurant);

  if (!isOpen) return '🔴 Closed';

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

const normalizeText = (value?: string) => {
  return String(value || '').toLowerCase().trim();
};

const getUserPreferences = (user: any): string[] => {
  const rawPreferences = user?.preferences;

  if (!rawPreferences) return [];

  if (Array.isArray(rawPreferences)) {
    return rawPreferences.map(preference => normalizeText(preference));
  }

  try {
    const parsed = JSON.parse(rawPreferences);

    if (Array.isArray(parsed)) {
      return parsed.map(preference => normalizeText(preference));
    }
  } catch {}

  return String(rawPreferences)
    .split(',')
    .map(preference => normalizeText(preference))
    .filter(Boolean);
};

const preferenceCuisineMap: Record<string, string[]> = {
  vegetarian: ['mediterranean', 'italian', 'asian', 'traditional', 'balkan'],
  vegan: ['mediterranean', 'asian', 'mixed'],
  halal: ['asian', 'mediterranean', 'traditional', 'balkan'],
  'gluten-free': ['mediterranean', 'italian', 'mixed'],
  'dairy-free': ['asian', 'mediterranean', 'mixed'],
  seafood: ['mediterranean', 'traditional'],
  'no pork': ['mediterranean', 'asian', 'mixed'],
  'no spicy food': ['italian', 'mediterranean', 'traditional', 'balkan'],
  'healthy food': ['mediterranean', 'asian', 'mixed'],
};

const calculateBestMatchScore = (
  restaurant: Restaurant,
  preferences: string[],
) => {
  if (preferences.length === 0 || preferences.includes('no preferences')) {
    return 0;
  }

  const cuisine = normalizeText(restaurant.cuisine_type);
  const restaurantType = normalizeText(restaurant.restaurant_type);
  const description = normalizeText(restaurant.description);

  let score = 0;

  preferences.forEach(preference => {
    const mappedCuisines = preferenceCuisineMap[preference] || [];

    if (mappedCuisines.includes(cuisine)) score += 4;
    if (mappedCuisines.includes(restaurantType)) score += 2;
    if (description.includes(preference)) score += 2;
    if (cuisine.includes(preference) || restaurantType.includes(preference)) score += 3;

    if (preference === 'seafood' && description.includes('fish')) score += 2;
    if (preference === 'healthy food' && description.includes('healthy')) score += 2;
    if (preference === 'halal' && description.includes('halal')) score += 4;
    if (preference === 'no pork' && description.includes('pork')) score -= 5;
    if (preference === 'no spicy food' && description.includes('spicy')) score -= 3;
  });

  score += Number(restaurant.average_rating || 0);

  return Math.max(score, 0);
};

export function useCustomerDashboard() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const userPreferences = useMemo(() => {
    return getUserPreferences(user);
  }, [user?.preferences]);

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
  const [hasShownBanAlert, setHasShownBanAlert] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<number[]>([]);
  const [togglingFavoriteId, setTogglingFavoriteId] = useState<number | null>(null);

  const filters = [
    'Best Match',
    'Open Now',
    'Highest Rated',
    'Most Visited',
    'Trending',
    'Favorites',
  ];

  const forceLogoutAfterBan = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
  }, [navigation]);

  const fetchFavorites = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/favorites/get-favorites.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerUserId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setFavoriteRestaurantIds(data.favoriteRestaurantIds || []);
      }
    } catch {}
  }, [user?.id]);

  const handleToggleFavorite = useCallback(
    async (restaurantId: number) => {
      if (!user?.id || togglingFavoriteId) return;

      try {
        setTogglingFavoriteId(restaurantId);

        const response = await fetch(
          'http://10.0.2.2/reservation-api/favorites/toggle-favorite.php',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerUserId: user.id,
              restaurantId,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          setFavoriteRestaurantIds(prev => {
            if (data.isFavorite) {
              return prev.includes(restaurantId) ? prev : [...prev, restaurantId];
            }

            return prev.filter(id => id !== restaurantId);
          });
        } else {
          Alert.alert('Error', data.message || 'Failed to update favorites.');
        }
      } catch {
        Alert.alert('Error', 'Something went wrong while updating favorites.');
      } finally {
        setTogglingFavoriteId(null);
      }
    },
    [user?.id, togglingFavoriteId],
  );

  const checkUserStatus = useCallback(async () => {
    if (!user?.id || hasShownBanAlert) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/check-user-status.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success && data.status === 'banned') {
        setHasShownBanAlert(true);

        const banMessage =
          data.ban_reason === 'admin_ban'
            ? 'Your account has been banned by an administrator.'
            : 'Your account has been banned after receiving 5 no-show reports from restaurants.';

        Alert.alert(
          'Account Banned',
          banMessage,
          [
            {
              text: 'OK',
              onPress: forceLogoutAfterBan,
            },
          ],
          'warning',
        );
      }
    } catch {}
  }, [user?.id, hasShownBanAlert, forceLogoutAfterBan]);

  const generateNotifications = useCallback(async () => {
    try {
      await fetch(
        'http://10.0.2.2/reservation-api/notifications/generate-notifications.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } catch {}
  }, []);

  const fetchRestaurants = useCallback(async () => {
    try {
      setIsLoadingRestaurants(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/restaurant/get-approved-restaurants.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        const backendPreferences = getUserPreferences({
          preferences: data.customer_preference,
        });

        const activePreferences =
          backendPreferences.length > 0 ? backendPreferences : userPreferences;

        const restaurantsWithStatus = (data.restaurants || []).map(
          (restaurant: Restaurant) => ({
            ...restaurant,
            displayStatus: getRestaurantDisplayStatus(restaurant),
            match_score: calculateBestMatchScore(restaurant, activePreferences),
          }),
        );

        setRestaurants(restaurantsWithStatus);
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to load restaurants.',
          [{ text: 'OK' }],
          'error',
        );
      }
    } catch {
      Alert.alert(
        'Error',
        'Something went wrong while loading restaurants.',
        [{ text: 'OK' }],
        'error',
      );
    } finally {
      setIsLoadingRestaurants(false);
    }
  }, [user?.id, userPreferences]);

  const fetchUnreadNotificationsCount = useCallback(async () => {
    if (!user?.id) {
      setUnreadNotificationsCount(0);
      return;
    }

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/notifications/get-notifications.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setUnreadNotificationsCount(Number(data.unread_count || 0));
      }
    } catch {}
  }, [user?.id]);

  useEffect(() => {
    const loadDashboard = async () => {
      await generateNotifications();
      await fetchFavorites();
      await fetchRestaurants();
      checkUserStatus();
      fetchUnreadNotificationsCount();
    };

    loadDashboard();

    const statusInterval = setInterval(() => {
      checkUserStatus();
    }, 10000);

    return () => clearInterval(statusInterval);
  }, [
    generateNotifications,
    fetchFavorites,
    fetchRestaurants,
    checkUserStatus,
    fetchUnreadNotificationsCount,
  ]);

  useFocusEffect(
    useCallback(() => {
      generateNotifications();
      fetchFavorites();
      fetchRestaurants();
      fetchUnreadNotificationsCount();
      checkUserStatus();
    }, [
      generateNotifications,
      fetchFavorites,
      fetchRestaurants,
      fetchUnreadNotificationsCount,
      checkUserStatus,
    ]),
  );

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const searchValue = search.toLowerCase().trim();

      if (!searchValue) return true;

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

      if (selectedFilter === 'Favorites') {
        return favoriteRestaurantIds.includes(Number(restaurant.id));
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === 'Best Match') {
        const scoreDifference =
          Number(b.match_score || 0) - Number(a.match_score || 0);

        if (scoreDifference !== 0) return scoreDifference;

        return Number(b.average_rating || 0) - Number(a.average_rating || 0);
      }

      if (selectedFilter === 'Highest Rated') {
        return Number(b.average_rating || 0) - Number(a.average_rating || 0);
      }

      if (selectedFilter === 'Most Visited') {
        return Number(b.visit_count || 0) - Number(a.visit_count || 0);
      }

      if (selectedFilter === 'Trending') {
        return Number(b.trending_score || 0) - Number(a.trending_score || 0);
      }

      return 0;
    });

  const handleOpenRestaurant = (restaurant: Restaurant) => {
    checkUserStatus();

    navigation.navigate('RestaurantDetails', {
      restaurant,
      user,
    });
  };

  const handleOpenNotifications = () => {
    navigation.navigate('Notifications', {
      user,
    });
  };

  const handleOpenProfile = () => {
    setIsProfileMenuOpen(false);
    checkUserStatus();

    navigation.navigate('CustomerProfile', {
      user,
    });
  };

  const handleOpenMyReservations = () => {
    setIsProfileMenuOpen(false);
    checkUserStatus();

    navigation.navigate('MyReservations', {
      user,
    });
  };

  const handleOpenMyReviews = () => {
    setIsProfileMenuOpen(false);
    checkUserStatus();

    navigation.navigate('MyReviews', {
      user,
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
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
      'confirm',
    );
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
    handleOpenMyReviews,
    handleLogout,
    fullName,
    initials,
    handleOpenRestaurant,
    handleOpenProfile,
    handleOpenMyReservations,
    unreadNotificationsCount,
    handleOpenNotifications,
    favoriteRestaurantIds,
    handleToggleFavorite,
    togglingFavoriteId,
  };
}