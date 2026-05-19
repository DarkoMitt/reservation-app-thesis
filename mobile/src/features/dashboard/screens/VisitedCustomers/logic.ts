import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

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
        'http://10.0.2.2/reservation-api/reservations/get-restaurant-requests.php',
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
        const visitedOnly = (data.requests || []).filter(
          (request: ReservationRequest) => request.status === 'visited',
        );

        setVisitedRequests(visitedOnly);
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
  };
}