import { useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { appAlert as Alert } from '../../../../shared/services/appAlert';

export type AdminTab =
  | 'pending'
  | 'users'
  | 'customers'
  | 'restaurants'
  | 'announcements';

export type DashboardStats = {
  pending_restaurants: number;
  active_users: number;
  banned_users: number;
  approved_restaurants: number;
};

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

export type AdminUser = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  trust_score: number | null;
  no_show_count: number | null;
  created_at: string;
};

export type AdminRestaurant = {
  restaurant_id: number;
  user_id: number;
  restaurant_name: string;
  restaurant_type: string;
  cuisine_type: string;
  city: string;
  address: string;
  phone: string;
  status: string;
  rejection_reason: string | null;
  created_at: string;
  email: string;
  user_status: string;
};

export function useAdminDashboard() {
  const navigation = useNavigation<any>();

  const [userSearch, setUserSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [recipientSearch, setRecipientSearch] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('pending');

  const [stats, setStats] = useState<DashboardStats>({
    pending_restaurants: 0,
    active_users: 0,
    banned_users: 0,
    approved_restaurants: 0,
  });

  const [pendingRestaurants, setPendingRestaurants] = useState<PendingRestaurant[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementTarget, setAnnouncementTarget] = useState('all_users');
  const [selectedTargetUserId, setSelectedTargetUserId] = useState('');

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/get-dashboard-stats.php',
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch {}
  };

  const fetchPendingRestaurants = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/get-pending-restaurants.php',
      );

      const data = await response.json();

      if (data.success) {
        setPendingRestaurants(data.restaurants || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load pending restaurants.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading pending restaurants.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/get-all-users.php',
      );

      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load users.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading users.');
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/get-all-restaurants.php',
      );

      const data = await response.json();

      if (data.success) {
        setRestaurants(data.restaurants || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load restaurants.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading restaurants.');
    }
  };

  const refreshAdminData = async () => {
    try {
      setIsLoading(true);

      await Promise.all([
        fetchDashboardStats(),
        fetchPendingRestaurants(),
        fetchUsers(),
        fetchRestaurants(),
      ]);
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Restaurant approved successfully.');
        refreshAdminData();
      } else {
        Alert.alert('Error', data.message || 'Failed to approve restaurant.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while approving restaurant.');
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
          headers: { 'Content-Type': 'application/json' },
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
        refreshAdminData();
      } else {
        Alert.alert('Error', data.message || 'Failed to reject restaurant.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while rejecting restaurant.');
    }
  };

  const postAction = async (
    endpoint: string,
    body: Record<string, unknown>,
    successMessage: string,
  ) => {
    try {
      const response = await fetch(
        `http://10.0.2.2/reservation-api/admin/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', successMessage);
        refreshAdminData();
      } else {
        Alert.alert('Error', data.message || 'Action failed.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleBanUser = (userId: number) => {
    Alert.alert('Ban User', 'Are you sure you want to ban this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Ban',
        style: 'destructive',
        onPress: () => postAction('ban-user.php', { userId }, 'User banned successfully.'),
      },
    ]);
  };

  const handleUnbanUser = (userId: number) => {
    postAction('unban-user.php', { userId }, 'User unbanned successfully.');
  };

  const handleDeleteUser = (userId: number) => {
    Alert.alert('Delete User', 'This will permanently delete the user. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          postAction('delete-user.php', { userId }, 'User deleted successfully.'),
      },
    ]);
  };

  const handleBanRestaurant = (restaurantId: number) => {
    Alert.alert('Ban Restaurant', 'Are you sure you want to ban this restaurant?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Ban',
        style: 'destructive',
        onPress: () =>
          postAction(
            'ban-restaurant.php',
            { restaurantId },
            'Restaurant banned successfully.',
          ),
      },
    ]);
  };

  const handleUnbanRestaurant = (restaurantId: number) => {
    postAction(
      'unban-restaurant.php',
      { restaurantId },
      'Restaurant unbanned successfully.',
    );
  };

  const handleDeleteRestaurant = (restaurantId: number) => {
    Alert.alert(
      'Delete Restaurant',
      'This will permanently delete the restaurant and its user account. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            postAction(
              'delete-restaurant.php',
              { restaurantId },
              'Restaurant deleted successfully.',
            ),
        },
      ],
    );
  };

  const handleSendAnnouncement = async () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) {
      Alert.alert('Error', 'Title and message are required.');
      return;
    }

    const needsTarget =
      announcementTarget === 'specific_user' ||
      announcementTarget === 'specific_restaurant';

    if (needsTarget && !selectedTargetUserId) {
      Alert.alert('Error', 'Please select a target user.');
      return;
    }

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/admin/send-announcement.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: announcementTitle.trim(),
            message: announcementMessage.trim(),
            targetType:
              announcementTarget === 'specific_customer'
                ? 'specific_user'
                : announcementTarget,
            targetUserId: selectedTargetUserId || null,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Success',
          `Announcement sent successfully to ${data.sent_count || 0} recipient(s).`,
        );
        setAnnouncementTitle('');
        setAnnouncementMessage('');
        setSelectedTargetUserId('');
      } else {
        Alert.alert('Error', data.message || 'Failed to send announcement.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while sending announcement.');
    }
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

  useEffect(() => {
    refreshAdminData();
  }, []);

  return {
    activeTab,
    setActiveTab,

    stats,
    pendingRestaurants,
    users,
    restaurants,
    isLoading,

    isRejectModalVisible,
    rejectionReason,
    setRejectionReason,
    openRejectModal,
    closeRejectModal,
    submitRejectRestaurant,

    announcementTitle,
    setAnnouncementTitle,
    announcementMessage,
    setAnnouncementMessage,
    announcementTarget,
    setAnnouncementTarget,
    selectedTargetUserId,
    setSelectedTargetUserId,

    handleApproveRestaurant,
    handleBanUser,
    handleUnbanUser,
    handleDeleteUser,
    handleBanRestaurant,
    handleUnbanRestaurant,
    handleDeleteRestaurant,
    handleSendAnnouncement,
    handleLogout,
    refreshAdminData,

    userSearch,
    setUserSearch,
    customerSearch,
    setCustomerSearch,
    restaurantSearch,
    setRestaurantSearch,
    recipientSearch,
    setRecipientSearch,
  };
}