import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRestaurantReviews } from './logic';
import { styles } from './styles';

function RestaurantReviews(): React.JSX.Element {
  const {
    reviews,
    summary,
    isLoading,
    handleBack,
    handleOpenCustomerProfile,
  } = useRestaurantReviews();

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

        <Text style={styles.title}>Restaurant Reviews</Text>

        <Text style={styles.subtitle}>
          Reviews submitted by customers for your restaurant.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Restaurant Rating</Text>

          <View style={styles.summaryMainRow}>
            <Text style={styles.summaryStar}>★</Text>
            <Text style={styles.summaryRating}>
              {summary.overallRating}/5
            </Text>
          </View>

          <Text style={styles.summaryText}>
            Based on {summary.totalReviews} customer reviews
          </Text>

          <Text style={styles.summaryText}>
            Most common price:{' '}
            {summary.mostCommonPrice
              ? `${summary.mostCommonPrice} MKD per person`
              : 'Not available'}
          </Text>

          <View style={styles.summaryDetailsBox}>
            <Text style={styles.summaryDetailText}>
              Food: {summary.foodRating}/5
            </Text>
            <Text style={styles.summaryDetailText}>
              Service: {summary.serviceRating}/5
            </Text>
            <Text style={styles.summaryDetailText}>
              Atmosphere: {summary.atmosphereRating}/5
            </Text>
          </View>
        </View>

        {reviews.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No Reviews Yet</Text>
            <Text style={styles.emptyText}>
              Customer reviews will appear here after completed reservations.
            </Text>
          </View>
        ) : (
          reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>
                    {review.customer_name}
                  </Text>
                  <Text style={styles.customerEmail}>
                    {review.customer_email}
                  </Text>
                </View>

                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>
                    ⭐{' '}
                    {(
                      (Number(review.food_rating || 0) +
                        Number(review.service_rating || 0) +
                        Number(review.atmosphere_rating || 0)) /
                      3
                    ).toFixed(1)}
                    /5
                  </Text>
                </View>
              </View>

              <View style={styles.ratingsRow}>
                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>Food</Text>
                  <Text style={styles.ratingValue}>
                    {review.food_rating}/5
                  </Text>
                </View>

                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>Service</Text>
                  <Text style={styles.ratingValue}>
                    {review.service_rating}/5
                  </Text>
                </View>

                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>Atmosphere</Text>
                  <Text style={styles.ratingValue}>
                    {review.atmosphere_rating}/5
                  </Text>
                </View>
              </View>

              {review.price_per_person ? (
                <Text style={styles.priceText}>
                  Price per person: {review.price_per_person} MKD
                </Text>
              ) : null}

              {review.review_text ? (
                <View style={styles.commentBox}>
                  <Text style={styles.commentTitle}>Customer Review</Text>
                  <Text style={styles.commentText}>
                    {review.review_text}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.viewProfileButton}
                activeOpacity={0.85}
                onPress={() =>
                  handleOpenCustomerProfile(review.customer_user_id)
                }>
                <Text style={styles.viewProfileButtonText}>
                  View Customer Profile
                </Text>
              </TouchableOpacity>

              <Text style={styles.dateText}>
                Submitted on:{' '}
                {new Date(review.created_at).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantReviews;