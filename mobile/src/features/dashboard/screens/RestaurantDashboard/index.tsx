import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
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
    handleBack,
    handleOpenProfile,
    handleLogout,
    handleApproveReservation,
    handleRejectReservation,
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

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Restaurant Dashboard</Text>

            <Text style={styles.title}>
              {restaurant?.restaurant_name || 'Restaurant'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}>
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
              {restaurant?.max_guests
                ? Number(restaurant.max_guests)
                : 0}
            </Text>

            <Text style={styles.statLabel}>Max Guests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {pendingRequests.length}
            </Text>

            <Text style={styles.statLabel}>Pending Requests</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Incoming Reservation Requests
          </Text>

          {isLoadingRequests ? (
            <ActivityIndicator size="small" color="#8B1E3F" />
          ) : pendingRequests.length === 0 ? (
            <Text style={styles.description}>
              No pending reservation requests yet.
            </Text>
          ) : (
            pendingRequests.map(request => (
              <View
                key={request.id}
                style={styles.requestCard}>

                <View style={styles.requestHeader}>
                  <Text style={styles.requestName}>
                    {request.full_name}
                  </Text>

                  <Text style={styles.requestRisk}>
                    Risk: {request.no_show_risk || 'Low'}
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
                  Trust Score: {request.trust_score || 100}
                </Text>

                {request.special_request ? (
                  <Text style={styles.requestText}>
                    Request: {request.special_request}
                  </Text>
                ) : null}

                <View style={styles.requestButtonsRow}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    disabled={isUpdatingRequest}
                    onPress={() =>
                      handleApproveReservation(request.id)
                    }>
                    <Text style={styles.approveButtonText}>
                      Approve
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectButton}
                    disabled={isUpdatingRequest}
                    onPress={() =>
                      handleRejectReservation(request.id)
                    }>
                    <Text style={styles.rejectButtonText}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Restaurant Information
          </Text>

          <Text style={styles.infoText}>
            Type: {restaurant?.restaurant_type || '-'}
          </Text>

          <Text style={styles.infoText}>
            Cuisine: {restaurant?.cuisine_type || '-'}
          </Text>

          <Text style={styles.infoText}>
            City: {restaurant?.city || '-'}
          </Text>

          <Text style={styles.infoText}>
            Address: {restaurant?.address || '-'}
          </Text>

          <Text style={styles.infoText}>
            Phone: {restaurant?.phone || '-'}
          </Text>

          <Text style={styles.infoText}>
            Email: {restaurant?.email || '-'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Hours</Text>

          <Text style={styles.description}>
            {restaurant?.working_hours ||
              'No working hours added.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>

          <Text style={styles.description}>
            {restaurant?.description ||
              'No description added yet.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantDashboard;