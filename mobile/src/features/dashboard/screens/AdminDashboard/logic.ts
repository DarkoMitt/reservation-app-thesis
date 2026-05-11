import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export type PendingRestaurant = {
  restaurant_id: number;
  user_id: number;
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
  email: string;
  created_at: string;
};

export function useAdminDashboard() {
  const [pendingRestaurants, setPendingRestaurants] = useState<PendingRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchPendingRestaurants = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/get-pending-restaurants.php',
      );

      const data = await response.json();

      if (data.success) {
        setPendingRestaurants(data.restaurants);
      } else {
        Alert.alert('Error', data.message || 'Failed to load pending restaurants.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while loading pending restaurants.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveRestaurant = async (restaurantId: number) => {
  try {
    const response = await fetch(
      'http://10.0.2.2/reservation-api/admin/approve-restaurant.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId,
        }),
      },
    );

    const data = await response.json();

    if (data.success) {
      Alert.alert('Success', 'Restaurant approved successfully.');

      fetchPendingRestaurants();
    } else {
      Alert.alert(
        'Error',
        data.message || 'Failed to approve restaurant.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'Something went wrong while approving restaurant.',
    );
  }
};

const openRejectModal = (restaurantId: number) => {
  setSelectedRestaurantId(restaurantId);
  setRejectionReason('');
  setIsRejectModalVisible(true);
};

const closeRejectModal = () => {
  setIsRejectModalVisible(false);
  setSelectedRestaurantId(null);
  setRejectionReason('');
};

const submitRejectRestaurant = async () => {
  if (!selectedRestaurantId || !rejectionReason.trim()) {
    Alert.alert('Error', 'Rejection reason is required.');
    return;
  }

  try {
    const response = await fetch(
      'http://10.0.2.2/reservation-api/admin/reject-restaurant.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurantId,
          reason: rejectionReason.trim(),
        }),
      },
    );

    const data = await response.json();

    if (data.success) {
      Alert.alert('Success', 'Restaurant rejected successfully.');
      closeRejectModal();
      fetchPendingRestaurants();
    } else {
      Alert.alert('Error', data.message || 'Failed to reject restaurant.');
    }
  } catch (error) {
    Alert.alert('Error', 'Something went wrong while rejecting restaurant.');
  }
};

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  return {
    pendingRestaurants,
    isLoading,
    fetchPendingRestaurants,
    handleApproveRestaurant,
    isRejectModalVisible,
    rejectionReason,
    setRejectionReason,
    openRejectModal,
    closeRejectModal,
    submitRejectRestaurant,
  };
}