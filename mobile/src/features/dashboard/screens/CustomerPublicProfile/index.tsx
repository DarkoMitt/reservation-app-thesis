import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCustomerPublicProfile } from './logic';
import { styles } from './styles';

const renderStars = (rating: number) => {
  return '★'.repeat(Number(rating || 0)) + '☆'.repeat(5 - Number(rating || 0));
};

function CustomerPublicProfile(): React.JSX.Element {
  const {
    customer,
    stats,
    ratings,
    isLoading,
    trustLevel,
    riskLevel,
    handleBack,
  } = useCustomerPublicProfile();

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

        <Text style={styles.title}>
          {customer?.first_name} {customer?.last_name}
        </Text>

        <Text style={styles.subtitle}>
          Customer reliability profile visible to restaurants.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Information</Text>
          <Text style={styles.infoText}>Email: {customer?.email || '-'}</Text>
          <Text style={styles.infoText}>Phone: {customer?.phone || '-'}</Text>
          <Text style={styles.infoText}>City: {customer?.city || '-'}</Text>
          <Text style={styles.infoText}>Age: {customer?.age || '-'}</Text>
          <Text style={styles.infoText}>
            Preferences: {customer?.preferences || 'No preferences'}
          </Text>
          <Text style={styles.infoText}>Status: {customer?.status || '-'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trust & Risk Overview</Text>

          <View style={styles.scoreRow}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreValue}>{customer?.trust_score ?? 0}</Text>
              <Text style={styles.scoreLabel}>Trust Score</Text>
            </View>

            <View style={styles.scoreBox}>
              <Text style={styles.scoreValue}>{customer?.no_show_count ?? 0}</Text>
              <Text style={styles.scoreLabel}>No-shows</Text>
            </View>
          </View>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{trustLevel} Trust</Text>
            </View>

            <View style={styles.riskBadge}>
              <Text style={styles.badgeText}>{riskLevel} Risk</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reservation History</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.total_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.visited_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Visited</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.no_show_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>No-shows</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.cancelled_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Cancelled</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.rejected_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Rejected</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.pending_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.approved_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Approved</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats?.changed_reservations ?? 0}</Text>
              <Text style={styles.statLabel}>Changed</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant Reviews</Text>

          {ratings.length === 0 ? (
            <Text style={styles.emptyText}>
              This customer has not received restaurant ratings yet.
            </Text>
          ) : (
            ratings.map(rating => (
              <View key={rating.id} style={styles.ratingCard}>
                <Text style={styles.ratingRestaurant}>
                  {rating.restaurant_name}
                </Text>

                <Text style={styles.stars}>
                  {renderStars(Number(rating.overall_rating))}
                </Text>

                {rating.review_text ? (
                  <Text style={styles.reviewText}>{rating.review_text}</Text>
                ) : (
                  <Text style={styles.reviewText}>No written review.</Text>
                )}

                <Text style={styles.ratingDate}>
                  {rating.created_at}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerPublicProfile;