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

  const initials = `${customer?.first_name?.[0] || ''}${
    customer?.last_name?.[0] || ''
  }`.toUpperCase();

  const renderInfoRow = (icon: string, label: string, value: string | number) => (
    <View style={styles.infoRow}>
      <View style={styles.infoIconBox}>
        <Text style={styles.infoIcon}>{icon}</Text>
      </View>

      <View style={styles.infoTextBox}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || '-'}</Text>
      </View>
    </View>
  );

  const renderStatCard = (icon: string, value: number, label: string) => (
    <View style={styles.statItem}>
      <View style={styles.statIconBox}>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.heroCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials || 'CU'}</Text>
          </View>

          <View style={styles.heroInfo}>
            <Text style={styles.title}>
              {customer?.first_name} {customer?.last_name}
            </Text>

            <View style={styles.heroBadgesRow}>
              <View style={styles.trustBadge}>
                <Text style={styles.badgeText}>{trustLevel} Trust</Text>
              </View>

              <View style={styles.riskBadge}>
                <Text style={styles.badgeText}>{riskLevel} Risk</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.scoreHeroCard}>
          <View>
            <Text style={styles.scoreHeroLabel}>Trust Score</Text>
            <Text style={styles.scoreHeroValue}>
              {customer?.trust_score ?? 0}
              <Text style={styles.scoreHeroMax}>/100</Text>
            </Text>
          </View>

          <View style={styles.scoreDivider} />

          <View>
            <Text style={styles.scoreHeroLabel}>No-shows</Text>
            <Text style={styles.scoreHeroValue}>
              {customer?.no_show_count ?? 0}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.cardTitle}>Customer Information</Text>
          </View>

          {renderInfoRow('✉️', 'Email', customer?.email || '-')}
          {renderInfoRow('📞', 'Phone', customer?.phone || '-')}
          {renderInfoRow('📍', 'City', customer?.city || '-')}
          {renderInfoRow('🎂', 'Age', customer?.age || '-')}
          {renderInfoRow(
            '🍽️',
            'Preferences',
            customer?.preferences || 'No preferences',
          )}
          {renderInfoRow('🟢', 'Status', customer?.status || '-')}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📊</Text>
            <Text style={styles.cardTitle}>Reservation History</Text>
          </View>

          <View style={styles.statsGrid}>
            {renderStatCard('📅', stats?.total_reservations ?? 0, 'Total')}
            {renderStatCard('✅', stats?.visited_reservations ?? 0, 'Visited')}
            {renderStatCard('❌', stats?.no_show_reservations ?? 0, 'No-shows')}
            {renderStatCard(
              '🚫',
              stats?.cancelled_reservations ?? 0,
              'Cancelled',
            )}
            {renderStatCard(
              '⛔',
              stats?.rejected_reservations ?? 0,
              'Rejected',
            )}
            {renderStatCard('⏳', stats?.pending_reservations ?? 0, 'Pending')}
            {renderStatCard(
              '👍',
              stats?.approved_reservations ?? 0,
              'Approved',
            )}
            {renderStatCard('🔄', stats?.changed_reservations ?? 0, 'Changed')}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.cardTitle}>Restaurant Reviews</Text>
          </View>

          {ratings.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyText}>
                This customer has not received restaurant ratings yet.
              </Text>
            </View>
          ) : (
            ratings.map(rating => (
              <View key={rating.id} style={styles.ratingCard}>
                <View style={styles.ratingHeader}>
                  <View>
                    <Text style={styles.ratingRestaurant}>
                      {rating.restaurant_name}
                    </Text>

                    <Text style={styles.stars}>
                      {renderStars(Number(rating.overall_rating))}
                    </Text>
                  </View>

                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>
                      {rating.overall_rating}/5
                    </Text>
                  </View>
                </View>

                {rating.review_text ? (
                  <Text style={styles.reviewText}>{rating.review_text}</Text>
                ) : (
                  <Text style={styles.reviewText}>No written review.</Text>
                )}

                <Text style={styles.ratingDate}>{rating.created_at}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerPublicProfile;