import React, { useState } from 'react';
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
  const [activeSection, setActiveSection] = useState<
    'incoming' | 'customerChanges' | 'waitlist' | 'past'
  >('incoming');

  const {
    restaurant,
    pendingRequests,
    customerChangeRequests,
    waitlistedRequests,
    pastApprovedRequests,
    isLoading,
    isLoadingRequests,
    isUpdatingRequest,
    handleOpenVisitedCustomers,

    selectedRejectRequestId,
    rejectionReason,
    setRejectionReason,
    handleRejectReservation,
    handleCancelReject,
    handleConfirmReject,

    selectedChangeRequestId,
    suggestedDate,
    isSuggestedDatePickerOpen,
    isSuggestedTimePickerOpen,
    suggestedDatePickerValue,
    suggestedTimePickerValue,
    openSuggestedDatePicker,
    openSuggestedTimePicker,
    handleSuggestedDatePickerChange,
    handleSuggestedTimePickerChange,
    suggestedTime,
    suggestedGuestsCount,
    setSuggestedGuestsCount,
    changeReason,
    setChangeReason,
    handleOfferChange,
    handleCancelChange,
    handleConfirmChange,

    handleOpenProfile,
    handleOpenRestaurantReviews,
    handleLogout,
    handleApproveReservation,
    handleApproveCustomerChange,
    handleRejectCustomerChange,
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

  const renderStatCard = (icon: string, value: number, label: string) => (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderSummaryItem = (
    key: 'incoming' | 'customerChanges' | 'waitlist' | 'past',
    icon: string,
    title: string,
    description: string,
    count: number,
  ) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.summaryItem,
        activeSection === key && styles.summaryItemActive,
      ]}
      onPress={() => setActiveSection(key)}>
      <View style={styles.summaryIconBox}>
        <Text style={styles.summaryIcon}>{icon}</Text>
      </View>

      <View style={styles.summaryTextBox}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryDescription}>{description}</Text>
      </View>

      <View style={styles.summaryRightBox}>
        <Text style={styles.summaryCount}>{count}</Text>
        <Text style={styles.summaryArrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRequestCard = (request: any) => (
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
          {request.risk_percentage ? ` (${request.risk_percentage}%)` : ''}
        </Text>
      </View>

      <Text style={styles.requestText}>Date: {request.reservation_date}</Text>
      <Text style={styles.requestText}>Time: {request.reservation_time}</Text>
      <Text style={styles.requestText}>Guests: {request.guests_count}</Text>
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
        <Text style={styles.viewProfileButtonText}>View Prediction Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewProfileButton}
        activeOpacity={0.85}
        onPress={() => handleOpenCustomerProfile(request.customer_user_id)}>
        <Text style={styles.viewProfileButtonText}>View Customer Profile</Text>
      </TouchableOpacity>

      {request.special_request ? (
        <Text style={styles.requestText}>Request: {request.special_request}</Text>
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
  );

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
              <Text style={{ fontSize: 20 }}>🔔</Text>

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
          </View>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>👑 Account Status</Text>
          <Text style={styles.statusValue}>
            {restaurant?.status || 'Unknown'}
          </Text>
          <Text style={styles.description}>
            Your restaurant is visible to customers.
          </Text>
        </View>

        <Text style={styles.cardTitle}>Overview</Text>

          <View style={styles.maxGuestsCard}>
            <View style={styles.maxGuestsIconBox}>
              <Text style={styles.maxGuestsIcon}>🍽️</Text>
            </View>

            <View>
              <Text style={styles.maxGuestsValue}>
                {restaurant?.max_guests ? Number(restaurant.max_guests) : 0}
              </Text>
              <Text style={styles.maxGuestsLabel}>Max Guests Capacity</Text>
            </View>
          </View>

          <View style={styles.smallStatsGrid}>
            {renderStatCard('📥', pendingRequests.length, 'Pending')}
            {renderStatCard('🔄', customerChangeRequests.length, 'Changes')}
            {renderStatCard('🪑', waitlistedRequests.length, 'Waitlist')}
            {renderStatCard('✅', pastApprovedRequests.length, 'To Review')}
          </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Summary</Text>

          {renderSummaryItem(
            'incoming',
            '📩',
            'Incoming Requests',
            pendingRequests.length === 0
              ? 'No pending reservation requests yet.'
              : `${pendingRequests.length} request(s) waiting for action.`,
            pendingRequests.length,
          )}

          {renderSummaryItem(
            'customerChanges',
            '🔄',
            'Customer Change Requests',
            customerChangeRequests.length === 0
              ? 'No customer change requests yet.'
              : `${customerChangeRequests.length} change request(s) waiting for response.`,
            customerChangeRequests.length,
          )}

          {renderSummaryItem(
            'waitlist',
            '👥',
            'Waitlist Requests',
            waitlistedRequests.length === 0
              ? 'No customers are currently waiting.'
              : `${waitlistedRequests.length} customer(s) waiting for seats.`,
            waitlistedRequests.length,
          )}

          {renderSummaryItem(
            'past',
            '✅',
            'Attendance Check',
            pastApprovedRequests.length === 0
              ? 'No reservations need attendance check.'
              : `${pastApprovedRequests.length} reservation(s) need review.`,
            pastApprovedRequests.length,
          )}
        </View>

        {activeSection === 'incoming' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Incoming Reservation Requests</Text>

            {isLoadingRequests ? (
              <ActivityIndicator size="small" color="#8B1E3F" />
            ) : pendingRequests.length === 0 ? (
              <Text style={styles.description}>
                No pending reservation requests yet.
              </Text>
            ) : (
              pendingRequests.map(renderRequestCard)
            )}
          </View>
        ) : null}

        {activeSection === 'customerChanges' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Customer Change Requests</Text>

            {isLoadingRequests ? (
              <ActivityIndicator size="small" color="#8B1E3F" />
            ) : customerChangeRequests.length === 0 ? (
              <Text style={styles.description}>
                No customer change requests yet.
              </Text>
            ) : (
              customerChangeRequests.map(request => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View>
                      <Text style={styles.requestName}>{request.full_name}</Text>
                      <Text style={styles.newCustomerBadge}>
                        Customer requested a change
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
                    Current Date: {request.reservation_date}
                  </Text>
                  <Text style={styles.requestText}>
                    Current Time: {request.reservation_time}
                  </Text>
                  <Text style={styles.requestText}>
                    Current Guests: {request.guests_count}
                  </Text>

                  <Text style={styles.requestText}>
                    Requested Date: {request.suggested_date || '-'}
                  </Text>
                  <Text style={styles.requestText}>
                    Requested Time: {request.suggested_time || '-'}
                  </Text>
                  <Text style={styles.requestText}>
                    Requested Guests: {request.suggested_guests_count || '-'}
                  </Text>

                  {request.change_reason ? (
                    <Text style={styles.requestText}>
                      Reason: {request.change_reason}
                    </Text>
                  ) : null}

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
                      onPress={() => handleApproveCustomerChange(request.id)}>
                      <Text style={styles.approveButtonText}>
                        Approve Change
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectButton}
                      disabled={isUpdatingRequest}
                      onPress={() => handleRejectCustomerChange(request.id)}>
                      <Text style={styles.rejectButtonText}>
                        Reject Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : null}

        {activeSection === 'waitlist' ? (
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
        ) : null}

        {activeSection === 'past' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Attendance Check</Text>

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
        ) : null}
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          activeOpacity={0.85}>
          <Text style={[styles.bottomNavIcon, styles.bottomNavTextActive]}>
            ⌂
          </Text>
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Home
          </Text>
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