import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  trust_score: number;
  no_show_count: number;
  city?: string;
  age?: number;
  preferences?: string;
};

type Stats = {
  total_reservations: number;
  visited_reservations: number;
  no_show_reservations: number;
  cancelled_reservations: number;
  rejected_reservations: number;
  pending_reservations: number;
  approved_reservations: number;
  changed_reservations: number;
};

type Rating = {
  id: number;
  overall_rating: number;
  review_text: string | null;
  created_at: string;
  restaurant_name: string;
};

export function useCustomerPublicProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const customerUserId = route.params?.customerUserId;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrustLevel = () => {
    const score = Number(customer?.trust_score || 0);

    if (score <= 25) return 'Low';
    if (score <= 50) return 'Medium';
    return 'High';
  };

  const getRiskLevel = () => {
    const score = Number(customer?.trust_score || 0);
    const noShows = Number(customer?.no_show_count || 0);

    if (score <= 25 || noShows >= 3) return 'High';
    if (score <= 50 || noShows >= 1) return 'Medium';
    return 'Low';
  };

  const fetchCustomerProfile = async () => {
    if (!customerUserId) {
      Alert.alert('Error', 'Customer ID is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/customer/get-customer-public-profile.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerUserId }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCustomer(data.customer);
        setStats(data.stats);
        setRatings(data.ratings || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load customer profile.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading customer profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  return {
    customer,
    stats,
    ratings,
    isLoading,
    trustLevel: getTrustLevel(),
    riskLevel: getRiskLevel(),
    handleBack,
  };
}