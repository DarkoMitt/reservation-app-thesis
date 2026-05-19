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

import { useRestaurantDashboard } from './logic';
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

function RestaurantDashboard(): React.JSX.Element {
  const {
    restaurant,
    pendingRequests,
    pastApprovedRequests,
    visitedRequests,
    isLoading,
    isLoadingRequests,
    isUpdatingRequest,

    selectedRejectRequestId,
    rejectionReason,
    setRejectionReason,
    handleRejectReservation,
    handleCancelReject,
    handleConfirmReject,

    selectedChangeRequestId,
    suggestedDate,
    setSuggestedDate,
    suggestedTime,
    setSuggestedTime,
    suggestedGuestsCount,
    setSuggestedGuestsCount,
    changeReason,
    setChangeReason,
    handleOfferChange,
    handleCancelChange,
    handleConfirmChange,

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
    handleOpenProfile,
    handleLogout,
    handleApproveReservation,
    handleMarkVisited,
    handleMarkNoShow,
  } = useRestaurantDashboard();

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

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Restaurant Dashboard</Text>
            <Text style={styles.title}>
              {restaurant?.restaurant_name || 'Restaurant'}
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Account Status</Text>
          <Text style={styles.statusValue}>
            {restaurant?.status || 'Unknown'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={handleOpenProfile}>
          <Text style={styles.profileButtonText}>My Profile</Text>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {restaurant?.max_guests ? Number(restaurant.max_guests) : 0}
            </Text>
            <Text style={styles.statLabel}>Max Guests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{pendingRequests.length}</Text>
            <Text style={styles.statLabel}>Pending Requests</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Incoming Reservation Requests</Text>

          {isLoadingRequests ? (
            <ActivityIndicator size="small" color="#8B1E3F" />
          ) : pendingRequests.length === 0 ? (
            <Text style={styles.description}>
              No pending reservation requests yet.
            </Text>
          ) : (
            pendingRequests.map(request => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View>
                    <Text style={styles.requestName}>{request.full_name}</Text>

                    {Number(request.is_new_customer) === 1 ? (
                      <Text style={styles.newCustomerBadge}>⭐ New customer</Text>
                    ) : null}
                  </View>

                  <Text style={styles.requestRisk}>
                    Risk: {request.no_show_risk || 'low'}
                  </Text>
                </View>

                <Text style={styles.requestText}>
                  Date: {request.reservation_date}
                </Text>
                <Text style={styles.requestText}>
                  Time: {request.reservation_time}
                </Text>
                <Text style={styles.requestText}>
                  Guests: {request.guests_count}
                </Text>
                <Text style={styles.requestText}>
                  Trust Score: {request.customer_trust_score || 20}
                </Text>
                <Text style={styles.requestText}>
                  No-shows: {request.customer_no_show_count || 0}
                </Text>

                {request.special_request ? (
                  <Text style={styles.requestText}>
                    Request: {request.special_request}
                  </Text>
                ) : null}

                {selectedRejectRequestId === request.id ? (
                  <View style={styles.rejectReasonBox}>
                    <Text style={styles.rejectReasonLabel}>Rejection Reason</Text>

                    <TextInput
                      style={styles.rejectReasonInput}
                      multiline
                      value={rejectionReason}
                      onChangeText={setRejectionReason}
                      placeholder="Example: No available capacity for this time slot..."
                      placeholderTextColor="#8B8178"
                    />

                    <View style={styles.requestButtonsRow}>
                      <TouchableOpacity
                        style={styles.cancelRejectButton}
                        disabled={isUpdatingRequest}
                        onPress={handleCancelReject}>
                        <Text style={styles.cancelRejectButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.rejectButton}
                        disabled={isUpdatingRequest}
                        onPress={handleConfirmReject}>
                        <Text style={styles.rejectButtonText}>Confirm Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : selectedChangeRequestId === request.id ? (
                  <View style={styles.changeOfferBox}>
                    <Text style={styles.changeOfferTitle}>Offer Changes</Text>

                    <Text style={styles.rejectReasonLabel}>Suggested Date</Text>
                    <TextInput
                      style={styles.inputSmall}
                      value={suggestedDate}
                      onChangeText={setSuggestedDate}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#8B8178"
                    />

                    <Text style={styles.rejectReasonLabel}>Suggested Time</Text>
                    <TextInput
                      style={styles.inputSmall}
                      value={suggestedTime}
                      onChangeText={setSuggestedTime}
                      placeholder="HH:MM"
                      placeholderTextColor="#8B8178"
                    />

                    <Text style={styles.rejectReasonLabel}>Suggested Guests</Text>
                    <TextInput
                      style={styles.inputSmall}
                      value={suggestedGuestsCount}
                      onChangeText={setSuggestedGuestsCount}
                      keyboardType="numeric"
                      placeholder="Example: 8"
                      placeholderTextColor="#8B8178"
                    />

                    <Text style={styles.rejectReasonLabel}>Reason / Message</Text>
                    <TextInput
                      style={styles.rejectReasonInput}
                      multiline
                      value={changeReason}
                      onChangeText={setChangeReason}
                      placeholder="Example: We can host 8 guests instead of 10."
                      placeholderTextColor="#8B8178"
                    />

                    <View style={styles.requestButtonsRow}>
                      <TouchableOpacity
                        style={styles.cancelRejectButton}
                        disabled={isUpdatingRequest}
                        onPress={handleCancelChange}>
                        <Text style={styles.cancelRejectButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.changeButton}
                        disabled={isUpdatingRequest}
                        onPress={handleConfirmChange}>
                        <Text style={styles.changeButtonText}>Send Offer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.requestButtonsRow}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      disabled={isUpdatingRequest}
                      onPress={() => handleApproveReservation(request.id)}>
                      <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.changeButton}
                      disabled={isUpdatingRequest}
                      onPress={() => handleOfferChange(request)}>
                      <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectButton}
                      disabled={isUpdatingRequest}
                      onPress={() => handleRejectReservation(request.id)}>
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Past Approved Reservations</Text>

          {pastApprovedRequests.length === 0 ? (
            <Text style={styles.description}>
              No approved reservations need attendance confirmation.
            </Text>
          ) : (
            pastApprovedRequests.map(request => (
              <View key={request.id} style={styles.requestCard}>
                <Text style={styles.requestName}>{request.full_name}</Text>
                <Text style={styles.requestText}>Date: {request.reservation_date}</Text>
                <Text style={styles.requestText}>Time: {request.reservation_time}</Text>
                <Text style={styles.requestText}>Guests: {request.guests_count}</Text>
                <Text style={styles.requestText}>
                  Trust Score: {request.customer_trust_score || 20}
                </Text>

                <View style={styles.requestButtonsRow}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    disabled={isUpdatingRequest}
                    onPress={() => handleMarkVisited(request.id)}>
                    <Text style={styles.approveButtonText}>Visited</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectButton}
                    disabled={isUpdatingRequest}
                    onPress={() => handleMarkNoShow(request.id)}>
                    <Text style={styles.rejectButtonText}>No-show</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visited Customers</Text>

          {visitedRequests.length === 0 ? (
            <Text style={styles.description}>
              No visited customers available for rating yet.
            </Text>
          ) : (
            visitedRequests.map(request => (
              <View key={request.id} style={styles.requestCard}>
                <Text style={styles.requestName}>{request.full_name}</Text>
                <Text style={styles.requestText}>Date: {request.reservation_date}</Text>
                <Text style={styles.requestText}>Time: {request.reservation_time}</Text>
                <Text style={styles.requestText}>Guests: {request.guests_count}</Text>

                {Number(request.has_restaurant_customer_rating) === 1 ? (
                  <Text style={styles.alreadyRatedText}>
                    Customer already rated by restaurant.
                  </Text>
                ) : selectedRateRequestId === request.id ? (
                  <View style={styles.rateCustomerBox}>
                    <Text style={styles.rateCustomerTitle}>Rate Customer</Text>

                    <Text style={styles.rejectReasonLabel}>Overall reliability</Text>
                    {renderStars(customerRating, setCustomerRating)}

                    <TextInput
                      style={styles.rejectReasonInput}
                      multiline
                      value={customerReviewText}
                      onChangeText={setCustomerReviewText}
                      placeholder="Example: Arrived on time and respected the reservation."
                      placeholderTextColor="#8B8178"
                    />

                    <View style={styles.requestButtonsRow}>
                      <TouchableOpacity
                        style={styles.cancelRejectButton}
                        disabled={isSubmittingRating}
                        onPress={handleCancelRateCustomer}>
                        <Text style={styles.cancelRejectButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.approveButton}
                        disabled={isSubmittingRating}
                        onPress={submitCustomerRating}>
                        <Text style={styles.approveButtonText}>
                          {isSubmittingRating ? 'Saving...' : 'Submit Rating'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.profileButton}
                    activeOpacity={0.85}
                    onPress={() => handleOpenRateCustomer(request.id)}>
                    <Text style={styles.profileButtonText}>Rate Customer</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant Information</Text>
          <Text style={styles.infoText}>Type: {restaurant?.restaurant_type || '-'}</Text>
          <Text style={styles.infoText}>Cuisine: {restaurant?.cuisine_type || '-'}</Text>
          <Text style={styles.infoText}>City: {restaurant?.city || '-'}</Text>
          <Text style={styles.infoText}>Address: {restaurant?.address || '-'}</Text>
          <Text style={styles.infoText}>Phone: {restaurant?.phone || '-'}</Text>
          <Text style={styles.infoText}>Email: {restaurant?.email || '-'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantDashboard;