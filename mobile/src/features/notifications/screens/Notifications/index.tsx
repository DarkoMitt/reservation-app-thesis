import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNotifications } from './logic';
import { styles } from './styles';

const getNotificationIcon = (type: string) => {
  if (type.includes('approved')) return '✅';
  if (type.includes('rejected')) return '❌';
  if (type.includes('change')) return '🔄';
  if (type.includes('visited')) return '⭐';
  if (type.includes('no_show')) return '⚠️';
  if (type.includes('new_reservation')) return '📅';
  return '🔔';
};

function Notifications(): React.JSX.Element {
  const {
    notifications,
    unreadCount,
    isLoading,
    isMarkingAll,
    handleBack,
    markNotificationRead,
    markAllNotificationsRead,
  } = useNotifications();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>
              {unreadCount} unread notifications
            </Text>
          </View>

          {unreadCount > 0 ? (
            <TouchableOpacity
              style={styles.markAllButton}
              activeOpacity={0.85}
              disabled={isMarkingAll}
              onPress={markAllNotificationsRead}>
              <Text style={styles.markAllButtonText}>
                {isMarkingAll ? 'Marking...' : 'Mark all'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {isLoading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#8B1E3F" />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No Notifications Yet</Text>
            <Text style={styles.emptyText}>
              Reservation updates and reminders will appear here.
            </Text>
          </View>
        ) : (
          notifications.map(notification => {
            const isUnread = Number(notification.is_read) === 0;

            return (
              <TouchableOpacity
                key={notification.id}
                activeOpacity={0.85}
                style={[
                  styles.notificationCard,
                  isUnread && styles.unreadNotificationCard,
                ]}
                onPress={() => markNotificationRead(notification.id)}>
                <View style={styles.notificationRow}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.notificationIcon}>
                      {getNotificationIcon(notification.notification_type)}
                    </Text>
                  </View>

                  <View style={styles.notificationContent}>
                    <View style={styles.notificationTitleRow}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>

                      {isUnread ? <View style={styles.unreadDot} /> : null}
                    </View>

                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>

                    <Text style={styles.notificationDate}>
                      {new Date(notification.created_at).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Notifications;