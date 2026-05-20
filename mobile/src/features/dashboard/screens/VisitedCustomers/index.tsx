import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useVisitedCustomers } from './logic';
import { styles } from './styles';

const renderStars = (
  value: string,
  onChange: (value: string) => void,
) => (
  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map(star => (
      <TouchableOpacity
        key={star}
        activeOpacity={0.75}
        onPress={() => onChange(String(star))}>
        <Text
          style={[
            styles.starText,
            Number(value) >= star && styles.activeStarText,
          ]}>
          ★
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

function VisitedCustomers(): React.JSX.Element {
  const {
    restaurant,
    visitedRequests,
    isLoading,

    selectedRateRequestId,
    customerRating,
    setCustomerRating,
    customerReviewText,
    setCustomerReviewText,
    isSubmittingRating,

    handleOpenRateCustomer,
    handleCancelRateCustomer,
    submitCustomerRating,
    handleBack,
    handleOpenCustomerProfile,
  } = useVisitedCustomers();

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

        <Text style={styles.title}>Visited Customers</Text>
        <Text style={styles.subtitle}>
          Customers who completed reservations at {restaurant?.restaurant_name || 'your restaurant'}.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{visitedRequests.length}</Text>
          <Text style={styles.summaryLabel}>Visited Reservations</Text>
        </View>

        {visitedRequests.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.emptyTitle}>No visited customers yet</Text>
            <Text style={styles.emptyText}>
              Customers will appear here after you mark approved reservations as visited.
            </Text>
          </View>
        ) : (
          visitedRequests.map(request => (
            <View key={request.id} style={styles.customerCard}>
              <View style={styles.customerHeader}>
                <View>
                  <Text style={styles.customerName}>{request.full_name}</Text>
                  <Text style={styles.customerEmail}>{request.email}</Text>
                </View>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>Visited</Text>
                </View>
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.detailText}>Date: {request.reservation_date}</Text>
                <Text style={styles.detailText}>Time: {request.reservation_time}</Text>
                <Text style={styles.detailText}>Guests: {request.guests_count}</Text>
              </View>

              <TouchableOpacity
                style={styles.viewProfileButton}
                activeOpacity={0.85}
                onPress={() =>
                  handleOpenCustomerProfile(request.customer_user_id)
                }>
                <Text style={styles.viewProfileButtonText}>
                  View Customer Profile
                </Text>
              </TouchableOpacity>

              {Number(request.has_restaurant_customer_rating) === 1 ? (
                <Text style={styles.alreadyRatedText}>
                  Customer already rated by restaurant.
                </Text>
              ) : selectedRateRequestId === request.id ? (
                <View style={styles.rateCustomerBox}>
                  <Text style={styles.rateCustomerTitle}>Rate Customer</Text>

                  <Text style={styles.inputLabel}>Overall reliability</Text>
                  {renderStars(customerRating, setCustomerRating)}

                  <TextInput
                    style={styles.reviewInput}
                    multiline
                    value={customerReviewText}
                    onChangeText={setCustomerReviewText}
                    placeholder="Example: Arrived on time and respected the reservation."
                    placeholderTextColor="#8B8178"
                  />

                  <View style={styles.buttonsRow}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      disabled={isSubmittingRating}
                      onPress={handleCancelRateCustomer}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.submitButton}
                      disabled={isSubmittingRating}
                      onPress={submitCustomerRating}>
                      <Text style={styles.submitButtonText}>
                        {isSubmittingRating ? 'Saving...' : 'Submit Rating'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.rateButton}
                  activeOpacity={0.85}
                  onPress={() => handleOpenRateCustomer(request.id)}>
                  <Text style={styles.rateButtonText}>Rate Customer</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default VisitedCustomers;