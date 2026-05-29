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
  age?: number;
  preferences?: string;
};

type CustomerStats = {
  total_reservations: number;
  visited_reservations: number;
  no_show_reservations: number;
  cancelled_reservations: number;
  pending_reservations: number;
  approved_reservations: number;
  rejected_reservations: number;
  change_requested_reservations: number;
  expired_reservations: number;
};

type TrustHistoryItem = {
  id: number;
  user_id: number;
  reservation_id: number | null;
  change_value: number;
  old_score: number;
  new_score: number;
  reason: string;
  created_at: string;
};

export const FOOD_PREFERENCES = [
  'No preferences',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten-free',
  'Dairy-free',
  'Seafood',
  'No pork',
  'No spicy food',
  'Healthy food',
];

export function useCustomerProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = route.params?.user;

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPreferences, setEditedPreferences] = useState('');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [trustHistory, setTrustHistory] = useState<TrustHistoryItem[]>([]);

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
        setEditedEmail(data.customer.email || '');
        setEditedPreferences(data.customer.preferences || 'No preferences');
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

    if (score <= 25) return 'Low';
    if (score <= 50) return 'Medium';
    return 'High';
  };

  const handlePreferenceSelect = (preference: string) => {
    setEditedPreferences(preference);
    setIsPreferencesOpen(false);
  };

  const handleStartEdit = () => {
    setEditedEmail(customer?.email || '');
    setEditedPreferences(customer?.preferences || 'No preferences');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedEmail(customer?.email || '');
    setEditedPreferences(customer?.preferences || 'No preferences');
    setIsPreferencesOpen(false);
    setIsEditing(false);
  };

  const fetchTrustHistory = async () => {
  if (!user?.id) return;

  try {
    const response = await fetch(
      'http://10.0.2.2/reservation-api/customer/get-trust-history.php',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      },
    );

    const data = await response.json();

    if (data.success) {
      setTrustHistory(data.history || []);
    }
  } catch {}
};

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!editedEmail.trim()) {
      Alert.alert('Validation error', 'Email is required.');
      return;
    }

    if (!emailRegex.test(editedEmail)) {
      Alert.alert('Validation error', 'Enter a valid email address.');
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/customer/update-customer-profile.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            email: editedEmail,
            preferences: editedPreferences,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Profile updated successfully.');
        setIsEditing(false);
        fetchCustomerProfile();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchCustomerProfile();
    fetchTrustHistory();
  }, []);

  return {
    customer,
    stats,
    isLoading,
    trustLevel: getTrustLevel(),
    handleBack,

    isEditing,
    editedEmail,
    setEditedEmail,
    editedPreferences,
    isPreferencesOpen,
    setIsPreferencesOpen,
    FOOD_PREFERENCES,
    handlePreferenceSelect,
    handleStartEdit,
    handleCancelEdit,
    handleSaveProfile,
    isSaving,
    trustHistory,
  };
}