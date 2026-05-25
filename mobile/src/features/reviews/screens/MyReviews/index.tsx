import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMyReviews } from './logic';
import { styles } from './styles';

function MyReviews(): React.JSX.Element {
  const {
    reviews,
    isLoading,
    handleBack,
  } = useMyReviews();

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

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Reviews</Text>

        <Text style={styles.subtitle}>
          Reviews you have submitted for restaurants.
        </Text>

        {reviews.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No Reviews Yet
            </Text>

            <Text style={styles.emptyText}>
              You have not submitted any restaurant reviews yet.
            </Text>
          </View>
        ) : (
          reviews.map(review => (
            <View
              key={review.id}
              style={styles.reviewCard}>

              <View style={styles.reviewHeader}>
                <Text style={styles.restaurantName}>
                  {review.restaurant_name}
                </Text>

                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>
                    ⭐ {review.overall_rating}/5
                  </Text>
                </View>
              </View>

              <Text style={styles.locationText}>
                {review.city} • {review.address}
              </Text>

              <View style={styles.ratingsRow}>
                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>
                    Food
                  </Text>

                  <Text style={styles.ratingValue}>
                    {review.food_rating}/5
                  </Text>
                </View>

                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>
                    Service
                  </Text>

                  <Text style={styles.ratingValue}>
                    {review.service_rating}/5
                  </Text>
                </View>

                <View style={styles.ratingBox}>
                  <Text style={styles.ratingLabel}>
                    Atmosphere
                  </Text>

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
                  <Text style={styles.commentTitle}>
                    Your Review
                  </Text>

                  <Text style={styles.commentText}>
                    {review.review_text}
                  </Text>
                </View>
              ) : null}

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

export default MyReviews;