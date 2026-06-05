import { useEffect, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import { useNavigation, useRoute } from '@react-navigation/native';

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

  customer_user_id: number;
  customer_name: string;
  customer_email: string;
};

type ReviewSummary = {
  totalReviews: number;
  overallRating: string;
  foodRating: string;
  serviceRating: string;
  atmosphereRating: string;
  mostCommonPrice: number | null;
};

const calculateMostCommonPrice = (reviews: Review[]) => {
  const prices = reviews
    .map(review => Number(review.price_per_person))
    .filter(price => price > 0);

  if (prices.length === 0) {
    return null;
  }

  const counts: Record<number, number> = {};

  prices.forEach(price => {
    counts[price] = (counts[price] || 0) + 1;
  });

  return Number(
    Object.entries(counts).sort((a, b) => {
      const countDiff = b[1] - a[1];

      if (countDiff !== 0) {
        return countDiff;
      }

      return Number(a[0]) - Number(b[0]);
    })[0][0],
  );
};

const calculateAverage = (values: number[]) => {
  const validValues = values.filter(value => value > 0);

  if (validValues.length === 0) {
    return '0.0';
  }

  const sum = validValues.reduce((total, value) => total + value, 0);

  return (sum / validValues.length).toFixed(1);
};

const buildReviewSummary = (reviews: Review[]): ReviewSummary => {
  return {
    totalReviews: reviews.length,
    overallRating: calculateAverage(
      reviews.map(review =>
        Number(
          (
            (Number(review.food_rating || 0) +
              Number(review.service_rating || 0) +
              Number(review.atmosphere_rating || 0)) /
            3
          ).toFixed(1),
        ),
      ),
    ),
    foodRating: calculateAverage(reviews.map(review => Number(review.food_rating || 0))),
    serviceRating: calculateAverage(reviews.map(review => Number(review.service_rating || 0))),
    atmosphereRating: calculateAverage(
      reviews.map(review => Number(review.atmosphere_rating || 0)),
    ),
    mostCommonPrice: calculateMostCommonPrice(reviews),
  };
};

export function useRestaurantReviews() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const restaurant = route.params?.restaurant;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary>({
    totalReviews: 0,
    overallRating: '0.0',
    foodRating: '0.0',
    serviceRating: '0.0',
    atmosphereRating: '0.0',
    mostCommonPrice: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    if (!restaurant?.restaurant_id) {
      Alert.alert('Error', 'Restaurant data is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-restaurant-reviews.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: restaurant.restaurant_id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        const loadedReviews = data.reviews || [];
        setReviews(loadedReviews);
        setSummary(buildReviewSummary(loadedReviews));
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

  const handleOpenCustomerProfile = (customerUserId: number) => {
    navigation.navigate('CustomerPublicProfile', {
      customerUserId,
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    summary,
    isLoading,
    handleBack,
    handleOpenCustomerProfile,
  };
}