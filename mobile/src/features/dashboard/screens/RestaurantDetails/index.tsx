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

import { useRestaurantDetails } from './logic';
import { styles } from './styles';

function RestaurantDetails(): React.JSX.Element {
  const {
    restaurant,
    activeReservation,
    lastRejectedReservation,
    isLoadingReservation,
    isRespondingChange,
    isCancellingReservation,
    isCancelBoxOpen,
    cancellationReason,
    setCancellationReason,
    reservationStatusLabel,
    rejectedStatusLabel,
    handleGoBack,
    handleReserve,
    handleAcceptChange,
    handleRejectChange,
    handleOpenCancelBox,
    handleCloseCancelBox,
    handleCancelReservation,
  } = useRestaurantDetails();

  const restaurantName =
    restaurant?.restaurant_name || restaurant?.name || 'Restaurant';

  const restaurantType =
    restaurant?.restaurant_type || restaurant?.type || 'Restaurant';

  const cuisineType =
    restaurant?.cuisine_type || restaurant?.foodType || 'Cuisine not added';

  const monThuHours = restaurant?.mon_thu_hours || 'Not added';
  const friSunHours = restaurant?.fri_sun_hours || 'Not added';

  const features = [
    Number(restaurant?.has_wifi) === 1 ? 'Wi-Fi' : null,
    Number(restaurant?.has_parking) === 1 ? 'Parking' : null,
    Number(restaurant?.has_outdoor_seating) === 1 ? 'Outdoor Seating' : null,
    Number(restaurant?.has_smoking_area) === 1 ? 'Smoking Area' : null,
  ].filter(Boolean);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.heroImage}>
          <Text style={styles.heroText}>{restaurantType}</Text>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.name}>{restaurantName}</Text>

          <Text style={styles.meta}>
            {restaurant?.city} • {restaurant?.address}
          </Text>

          <Text style={styles.foodType}>{cuisineType}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>Rating 4.5</Text>
            <Text style={styles.status}>🟢 Open now</Text>
          </View>
        </View>

        {isLoadingReservation ? (
          <View style={styles.reservationStatusCard}>
            <ActivityIndicator size="small" color="#8B1E3F" />
            <Text style={styles.reservationInfoText}>
              Checking reservation status...
            </Text>
          </View>
        ) : activeReservation ? (
          <View style={styles.reservationStatusCard}>
            <Text style={styles.reservationStatusTitle}>
              {reservationStatusLabel}
            </Text>

            <Text style={styles.reservationInfoText}>
              Current Date: {activeReservation.reservation_date}
            </Text>

            <Text style={styles.reservationInfoText}>
              Current Time: {activeReservation.reservation_time}
            </Text>

            <Text style={styles.reservationInfoText}>
              Current Guests: {activeReservation.guests_count}
            </Text>

            <Text style={styles.reservationInfoText}>
              Trust Score: {activeReservation.trust_score || 100}
            </Text>

            {activeReservation.status === 'change_requested' ? (
              <View style={styles.changeRequestBox}>
                <Text style={styles.changeRequestTitle}>
                  Suggested Changes
                </Text>

                <Text style={styles.reservationInfoText}>
                  Suggested Date: {activeReservation.suggested_date}
                </Text>

                <Text style={styles.reservationInfoText}>
                  Suggested Time: {activeReservation.suggested_time}
                </Text>

                <Text style={styles.reservationInfoText}>
                  Suggested Guests: {activeReservation.suggested_guests_count}
                </Text>

                <Text style={styles.changeReasonText}>
                  Message: {activeReservation.change_reason}
                </Text>

                <Text style={styles.expiryText}>
                  You have 1 hour to respond. Expires at:{' '}
                  {activeReservation.change_expires_at}
                </Text>

                <View style={styles.changeButtonsRow}>
                  <TouchableOpacity
                    style={styles.acceptChangeButton}
                    disabled={isRespondingChange}
                    onPress={handleAcceptChange}>
                    <Text style={styles.acceptChangeButtonText}>
                      Accept Changes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectChangeButton}
                    disabled={isRespondingChange}
                    onPress={handleRejectChange}>
                    <Text style={styles.rejectChangeButtonText}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {activeReservation.status !== 'change_requested' ? (
              isCancelBoxOpen ? (
                <View style={styles.cancelBox}>
                  <Text style={styles.cancelTitle}>
                    Cancel Reservation
                  </Text>

                  <Text style={styles.cancelHint}>
                    You can cancel only at least 5 hours before the reservation time.
                    Reason is optional.
                  </Text>

                  <TextInput
                    style={styles.cancelInput}
                    multiline
                    value={cancellationReason}
                    onChangeText={setCancellationReason}
                    placeholder="Optional cancellation reason..."
                    placeholderTextColor="#8B8178"
                  />

                  <View style={styles.changeButtonsRow}>
                    <TouchableOpacity
                      style={styles.cancelSecondaryButton}
                      disabled={isCancellingReservation}
                      onPress={handleCloseCancelBox}>
                      <Text style={styles.cancelSecondaryButtonText}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cancelReservationButton}
                      disabled={isCancellingReservation}
                      onPress={handleCancelReservation}>
                      <Text style={styles.cancelReservationButtonText}>
                        Confirm Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.cancelReservationButton}
                  disabled={isCancellingReservation}
                  onPress={handleOpenCancelBox}>
                  <Text style={styles.cancelReservationButtonText}>
                    Cancel Reservation
                  </Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.reserveButton}
            activeOpacity={0.85}
            onPress={handleReserve}>
            <Text style={styles.reserveButtonText}>Reserve a Table</Text>
          </TouchableOpacity>
        )}

        {!activeReservation && lastRejectedReservation ? (
          <View style={styles.rejectedReservationCard}>
            <Text style={styles.rejectedReservationTitle}>
              {rejectedStatusLabel}
            </Text>

            <Text style={styles.reservationInfoText}>
              Your reservation at {restaurantName} was rejected.
            </Text>

            <Text style={styles.reservationInfoText}>
              Date: {lastRejectedReservation.reservation_date}
            </Text>

            <Text style={styles.reservationInfoText}>
              Time: {lastRejectedReservation.reservation_time}
            </Text>

            <Text style={styles.rejectionReasonText}>
              Reason:{' '}
              {lastRejectedReservation.rejection_reason ||
                'No reason provided.'}
            </Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.description}>
            {restaurant?.description ||
              'This restaurant has not added a description yet.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Hours</Text>
          <Text style={styles.infoText}>Mon - Thu: {monThuHours}</Text>
          <Text style={styles.infoText}>Fri - Sun: {friSunHours}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>

          {features.length > 0 ? (
            <View style={styles.featuresGrid}>
              {features.map(feature => (
                <Text key={String(feature)} style={styles.featureChip}>
                  {feature}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.description}>No features added yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantDetails;