import React, { useEffect, useMemo, useState } from 'react';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { appAlert as Alert } from '../../../../shared/services/appAlert';

type ReservationRequest = {
  id: number;
  customer_user_id: number;
  restaurant_id: number;
  reservation_date: string;
  reservation_time: string;
  guests_count: number;
  status: string;
  full_name: string;
  email: string;
  has_restaurant_customer_rating?: number;
};

export function useVisitedCustomers() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const restaurant = route.params?.restaurant;
  const user = route.params?.user;

  const [visitedRequests, setVisitedRequests] = useState<ReservationRequest[]>([]);
  const [reviewDate, setReviewDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRateRequestId, setSelectedRateRequestId] = useState<number | null>(null);
  const [customerRating, setCustomerRating] = useState('');
  const [customerReviewText, setCustomerReviewText] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const fetchVisitedCustomers = async () => {
    if (!restaurant?.restaurant_id) {
      Alert.alert('Error', 'Restaurant data is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/reservations/get-visited-customers-for-review.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId: restaurant.restaurant_id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setVisitedRequests(data.requests || []);
        setReviewDate(data.review_date || '');
      } else {
        Alert.alert('Error', data.message || 'Failed to load visited customers.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading visited customers.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenRateCustomer = (reservationId: number) => {
    setSelectedRateRequestId(reservationId);
    setCustomerRating('');
    setCustomerReviewText('');
  };

  const handleCancelRateCustomer = () => {
    setSelectedRateRequestId(null);
    setCustomerRating('');
    setCustomerReviewText('');
  };

  const submitCustomerRating = async () => {
    if (!selectedRateRequestId) return;

    if (!customerRating) {
      Alert.alert('Missing Rating', 'Please select customer rating.');
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
            reservationId: selectedRateRequestId,
            reviewerUserId: user?.id,
            ratingType: 'restaurant_to_customer',
            overallRating: Number(customerRating),
            reviewText: customerReviewText,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Customer rating submitted successfully.');

        setSelectedRateRequestId(null);
        setCustomerRating('');
        setCustomerReviewText('');

        fetchVisitedCustomers();
      } else {
        Alert.alert('Error', data.message || 'Failed to submit rating.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while submitting rating.');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenCustomerProfile = (customerUserId: number) => {
    navigation.navigate('CustomerPublicProfile', {
      customerUserId,
      user,
  });
  };

  const handleOpenHome = () => {
    navigation.navigate('RestaurantDashboard', { user });
  };

  const handleOpenRestaurantReviews = () => {
    navigation.navigate('RestaurantReviews', { restaurant, user });
  };

  const handleOpenVisitedCustomers = () => {
    navigation.navigate('VisitedCustomers', { restaurant, user });
  };

  const handleOpenProfile = () => {
    navigation.navigate('RestaurantProfile', { restaurant, user });
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
        key: 'reviews',
        label: 'Reviews',
        icon: '★',
        onPress: handleOpenRestaurantReviews,
      },
      {
        key: 'visited',
        label: 'Visited',
        icon: '•',
        isActive: true,
        onPress: handleOpenVisitedCustomers,
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
    [restaurant, user],
  );

  useEffect(() => {
    fetchVisitedCustomers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchVisitedCustomers();
    }, [restaurant?.restaurant_id]),
  );

  return {
    restaurant,
    visitedRequests,
    reviewDate,
    isLoading,

    selectedRateRequestId,
    customerRating,
    setCustomerRating,
    customerReviewText,
    setCustomerReviewText,
    isSubmittingRating,

    handleOpenRateCustomer,
    handleCancelRateCustomer,
    submitCustomerRating,
    handleBack,
    handleOpenCustomerProfile,
    bottomNavItems,
  };
}