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

function RestaurantDashboard(): React.JSX.Element {
  const {
    restaurant,
    pendingRequests,
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

    handleBack,
    handleOpenProfile,
    handleLogout,
    handleApproveReservation,
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
          <Text style={styles.statusValue}>{restaurant?.status || 'Unknown'}</Text>
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
            <Text style={styles.description}>No pending reservation requests yet.</Text>
          ) : (
            pendingRequests.map(request => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Text style={styles.requestName}>{request.full_name}</Text>
                  <Text style={styles.requestRisk}>
                    Risk: {request.no_show_risk || 'low'}
                  </Text>
                </View>

                <Text style={styles.requestText}>Date: {request.reservation_date}</Text>
                <Text style={styles.requestText}>Time: {request.reservation_time}</Text>
                <Text style={styles.requestText}>Guests: {request.guests_count}</Text>
                <Text style={styles.requestText}>
                  Trust Score: {request.trust_score || 100}
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
                      placeholder="Example: We can host 8 guests instead of 10 at this time."
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