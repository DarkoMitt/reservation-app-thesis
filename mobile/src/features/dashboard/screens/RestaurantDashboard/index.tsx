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
import DateTimePicker from '@react-native-community/datetimepicker';

function RestaurantDashboard(): React.JSX.Element {
  const {
    restaurant,
    pendingRequests,
    waitlistedRequests,
    pastApprovedRequests,
    isLoading,
    isLoadingRequests,
    isUpdatingRequest,

    isProfileMenuOpen,
    setIsProfileMenuOpen,
    restaurantInitial,
    handleOpenVisitedCustomers,

    selectedRejectRequestId,
    rejectionReason,
    setRejectionReason,
    handleRejectReservation,
    handleCancelReject,
    handleConfirmReject,

    selectedChangeRequestId,
    suggestedDate,
    setSuggestedDate,
    isSuggestedDatePickerOpen,
    isSuggestedTimePickerOpen,
    suggestedDatePickerValue,
    suggestedTimePickerValue,
    openSuggestedDatePicker,
    openSuggestedTimePicker,
    handleSuggestedDatePickerChange,
    handleSuggestedTimePickerChange,
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
    handleOpenRestaurantReviews,
    handleLogout,
    handleApproveReservation,
    handleMarkVisited,
    handleMarkNoShow,
    handleOpenCustomerProfile,
    handleOpenPredictionDetails,

    unreadNotificationsCount,
    handleOpenNotifications,
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

        <View style={styles.topHeader}>
          <View>
            <Text style={styles.title}>
              {restaurant?.restaurant_name || 'Restaurant'}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.8}
              onPress={handleOpenNotifications}>
              <View style={styles.notificationIconWrap}>
                <View style={styles.notificationBellBody} />
                <View style={styles.notificationBellClapper} />
              </View>

              {unreadNotificationsCount > 0 ? (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadNotificationsCount > 99
                      ? '99+'
                      : unreadNotificationsCount}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatarButton}
              activeOpacity={0.85}
              onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <Text style={styles.avatarText}>{restaurantInitial}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isProfileMenuOpen ? (
          <View style={styles.profileMenu}>
            <Text style={styles.profileMenuName}>
              {restaurant?.restaurant_name || 'Restaurant'}
            </Text>

            <TouchableOpacity
              style={styles.profileMenuItem}
              onPress={handleOpenProfile}>
              <Text style={styles.profileMenuText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileMenuItem}
              onPress={handleOpenRestaurantReviews}>
              <Text style={styles.profileMenuText}>Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileMenuItem}
              onPress={handleOpenVisitedCustomers}>
              <Text style={styles.profileMenuText}>Visited Customers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileMenuItem}
              onPress={handleLogout}>
              <Text style={styles.profileMenuLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Account Status</Text>
          <Text style={styles.statusValue}>
            {restaurant?.status || 'Unknown'}
          </Text>
        </View>

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

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{waitlistedRequests.length}</Text>
            <Text style={styles.statLabel}>Waitlist</Text>
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
                    {request.risk_percentage
                      ? ` (${request.risk_percentage}%)`
                      : ''}
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

                <TouchableOpacity
                  style={styles.viewProfileButton}
                  activeOpacity={0.85}
                  onPress={() => handleOpenPredictionDetails(request)}>
                  <Text style={styles.viewProfileButtonText}>
                    View Prediction Details
                  </Text>
                </TouchableOpacity>

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
                    <TouchableOpacity
                      style={styles.inputSmall}
                      activeOpacity={0.85}
                      onPress={openSuggestedDatePicker}>
                      <Text style={styles.pickerInputText}>
                        {suggestedDate || 'YYYY-MM-DD'}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.rejectReasonLabel}>Suggested Time</Text>
                    <TouchableOpacity
                      style={styles.inputSmall}
                      activeOpacity={0.85}
                      onPress={openSuggestedTimePicker}>
                      <Text style={styles.pickerInputText}>
                        {suggestedTime || 'HH:MM'}
                      </Text>
                    </TouchableOpacity>

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
          <Text style={styles.cardTitle}>Waitlist Requests</Text>

          {isLoadingRequests ? (
            <ActivityIndicator size="small" color="#8B1E3F" />
          ) : waitlistedRequests.length === 0 ? (
            <Text style={styles.description}>
              No customers are currently waiting for available seats.
            </Text>
          ) : (
            waitlistedRequests.map(request => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View>
                    <Text style={styles.requestName}>{request.full_name}</Text>
                    <Text style={styles.newCustomerBadge}>
                      Waitlist #{request.waitlist_position || '-'}
                    </Text>
                  </View>

                  <Text style={styles.requestRisk}>
                    Risk: {request.no_show_risk || 'low'}
                    {request.risk_percentage
                      ? ` (${request.risk_percentage}%)`
                      : ''}
                  </Text>
                </View>

                <Text style={styles.requestText}>
                  Date: {request.reservation_date}
                </Text>
                <Text style={styles.requestText}>
                  Time: {request.reservation_time}
                </Text>
                <Text style={styles.requestText}>
                  Guests Needed: {request.guests_count}
                </Text>
                <Text style={styles.requestText}>
                  Trust Score: {request.customer_trust_score || 20}
                </Text>
                <Text style={styles.requestText}>
                  No-shows: {request.customer_no_show_count || 0}
                </Text>

                <TouchableOpacity
                  style={styles.viewProfileButton}
                  activeOpacity={0.85}
                  onPress={() => handleOpenPredictionDetails(request)}>
                  <Text style={styles.viewProfileButtonText}>
                    View Prediction Details
                  </Text>
                </TouchableOpacity>

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

                {request.special_request ? (
                  <Text style={styles.requestText}>
                    Request: {request.special_request}
                  </Text>
                ) : null}
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
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          activeOpacity={0.85}>
          <Text style={[styles.bottomNavIcon, styles.bottomNavTextActive]}>⌂</Text>
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenRestaurantReviews}>
          <Text style={styles.bottomNavIcon}>★</Text>
          <Text style={styles.bottomNavText}>Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenVisitedCustomers}>
          <Text style={styles.bottomNavIcon}>◉</Text>
          <Text style={styles.bottomNavText}>Visited</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenProfile}>
          <Text style={styles.bottomNavIcon}>◎</Text>
          <Text style={styles.bottomNavText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleLogout}>
          <Text style={styles.bottomNavIcon}>↩</Text>
          <Text style={styles.bottomNavText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {isSuggestedDatePickerOpen ? (
        <DateTimePicker
          value={suggestedDatePickerValue}
          mode="date"
          display="calendar"
          onChange={handleSuggestedDatePickerChange}
        />
      ) : null}

      {isSuggestedTimePickerOpen ? (
        <DateTimePicker
          value={suggestedTimePickerValue}
          mode="time"
          is24Hour
          display="clock"
          onChange={handleSuggestedTimePickerChange}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default RestaurantDashboard;