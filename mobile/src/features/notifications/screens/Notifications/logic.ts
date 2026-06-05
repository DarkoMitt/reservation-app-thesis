import { useCallback, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

type NotificationItem = {
  id: number;
  user_id: number;
  role: string;
  title: string;
  message: string;
  notification_type: string;
  related_reservation_id: number | null;
  related_restaurant_id: number | null;
  is_read: number;
  created_at: string;
};

export function useNotifications() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const user = route.params?.user;

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const fetchNotifications = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User data is missing.');
      return;
    }

    try {
      setIsLoading(true);
      await generateNotifications();

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
        setNotifications(data.notifications || []);
        setUnreadCount(Number(data.unread_count || 0));
      } else {
        Alert.alert('Error', data.message || 'Failed to load notifications.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while loading notifications.');
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationRead = async (notificationId: number) => {
    if (!user?.id) return;

    try {
      await fetch(
        'http://10.0.2.2/reservation-api/notifications/mark-notification-read.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notificationId,
            userId: user.id,
          }),
        },
      );

      fetchNotifications();
    } catch {
      Alert.alert('Error', 'Something went wrong while updating notification.');
    }
  };

  const generateNotifications = async () => {
        try {
            await fetch(
            'http://10.0.2.2/reservation-api/notifications/generate-notifications.php',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            },
            );
        } catch {}
    };

  const markAllNotificationsRead = async () => {
    if (!user?.id) return;

    try {
      setIsMarkingAll(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/notifications/mark-all-notifications-read.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        },
      );

      const data = await response.json();

      if (data.success) {
        fetchNotifications();
      } else {
        Alert.alert('Error', data.message || 'Failed to mark notifications.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while marking notifications.');
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationPress = async (notification: NotificationItem) => {
    if (!user?.id) return;

    try {
      await markNotificationRead(notification.id);

      if (user.role === 'customer' && notification.related_reservation_id) {
        const response = await fetch(
          'http://10.0.2.2/reservation-api/reservations/get-reservation-by-id.php',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reservationId: notification.related_reservation_id,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          navigation.navigate('ReservationDetails', {
            reservation: data.reservation,
            user,
          });
        }

        return;
      }

      if (user.role === 'restaurant') {
        navigation.navigate('RestaurantDashboard', {
          user,
        });
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while opening notification.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [user?.id]),
  );

  return {
    notifications,
    unreadCount,
    isLoading,
    isMarkingAll,
    handleBack,
    handleNotificationPress,
    markNotificationRead,
    markAllNotificationsRead,
  };
}