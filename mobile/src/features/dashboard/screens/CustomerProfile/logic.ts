import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type CustomerProfile = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  trust_score: number;
  no_show_count: number;
  created_at: string;
};

type CustomerStats = {
  total_reservations: number;
  visited_reservations: number;
  no_show_reservations: number;
  cancelled_reservations: number;
  pending_reservations: number;
  approved_reservations: number;
  rejected_reservations: number;
};

export function useCustomerProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = route.params?.user;

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomerProfile = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User data is missing.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/customer/get-customer-profile.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCustomer(data.customer);
        setStats(data.stats);
      } else {
        Alert.alert('Error', data.message || 'Failed to load customer profile.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading customer profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTrustLevel = () => {
    const score = Number(customer?.trust_score || 0);

    if (score < 15) {
      return 'Low';
    }

    if (score < 40) {
      return 'Medium';
    }

    return 'High';
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
    isLoading,
    trustLevel: getTrustLevel(),
    handleBack,
  };
}