import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCustomerProfile } from './logic';
import { styles } from './styles';

function CustomerProfile(): React.JSX.Element {
  const {
    customer,
    stats,
    isLoading,
    trustLevel,
    handleBack,
  } = useCustomerProfile();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#8B1E3F" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          View your trust score, no-show history and reservation activity.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Information</Text>

          <Text style={styles.infoText}>
            Name: {customer?.first_name} {customer?.last_name}
          </Text>
          <Text style={styles.infoText}>Email: {customer?.email || '-'}</Text>
          <Text style={styles.infoText}>Phone: {customer?.phone || '-'}</Text>
          <Text style={styles.infoText}>Status: {customer?.status || '-'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trust Overview</Text>

          <View style={styles.trustScoreCircle}>
            <Text style={styles.trustScoreValue}>
              {customer?.trust_score ?? 0}
            </Text>
            <Text style={styles.trustScoreLabel}>Trust Score</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{trustLevel} Trust</Text>
          </View>

          <Text style={styles.infoText}>
            No-shows: {customer?.no_show_count ?? 0}
          </Text>
        </View>

        <View style={styles.card}>
  <Text style={styles.cardTitle}>Reservation Statistics</Text>

  <View style={styles.totalStatsCard}>
    <Text style={styles.totalStatsNumber}>
      {stats?.total_reservations ?? 0}
    </Text>
    <Text style={styles.totalStatsLabel}>Total Reservations</Text>
  </View>

  <View style={styles.statsGrid}>
    {[
      { label: 'Visited', value: stats?.visited_reservations ?? 0, icon: '✓' },
      { label: 'No-shows', value: stats?.no_show_reservations ?? 0, icon: '!' },
      { label: 'Cancelled', value: stats?.cancelled_reservations ?? 0, icon: '×' },
      { label: 'Pending', value: stats?.pending_reservations ?? 0, icon: '…' },
      { label: 'Approved', value: stats?.approved_reservations ?? 0, icon: '★' },
      { label: 'Rejected', value: stats?.rejected_reservations ?? 0, icon: '-' },
    ].map(item => (
      <View key={item.label} style={styles.statBox}>
        <View style={styles.statIconCircle}>
          <Text style={styles.statIcon}>{item.icon}</Text>
        </View>

        <View>
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      </View>
    ))}
  </View>
</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerProfile;