import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useReservationDetails } from './logic';
import { styles } from './styles';

function ReservationDetails(): React.JSX.Element {
  const {
    reservation,
    isPastReservation,
    canCancelReservation,
    handleGoBack,
    handleOpenRestaurant,
    handleCancelReservation,
    handleAcceptChange,
    handleRejectChange,
  } = useReservationDetails();

  const displayStatus =
    reservation.display_status || reservation.status || 'Reservation';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Reservation Details</Text>

        <View style={styles.card}>
          <Text style={styles.restaurantName}>
            {reservation.restaurant_name}
          </Text>

          <Text style={styles.restaurantMeta}>
            {reservation.city} • {reservation.address}
          </Text>

          <Text
            style={[
              styles.statusBadge,
              isPastReservation && styles.pastStatusBadge,
            ]}>
            {displayStatus}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reservation Info</Text>

          {isPastReservation ? (
            <Text style={styles.pastLabel}>Past Reservation</Text>
          ) : (
            <Text style={styles.upcomingLabel}>Active / Upcoming</Text>
          )}

          <Text style={styles.infoText}>
            Date: {reservation.reservation_date}
          </Text>

          <Text style={styles.infoText}>
            Time: {reservation.reservation_time}
          </Text>

          <Text style={styles.infoText}>
            Guests: {reservation.guests_count}
          </Text>

          {reservation.special_request ? (
            <Text style={styles.infoText}>
              Request: {reservation.special_request}
            </Text>
          ) : null}
        </View>

        {reservation.status === 'rejected' ? (
          <View style={styles.rejectedCard}>
            <Text style={styles.rejectedTitle}>
              Reservation Rejected
            </Text>

            <Text style={styles.rejectedReason}>
              {reservation.rejection_reason || 'No reason provided.'}
            </Text>
          </View>
        ) : null}

        {reservation.status === 'change_requested' && !isPastReservation ? (
          <View style={styles.changeCard}>
            <Text style={styles.changeTitle}>
              Restaurant Suggested Changes
            </Text>

            <Text style={styles.infoText}>
              Suggested Date: {reservation.suggested_date}
            </Text>

            <Text style={styles.infoText}>
              Suggested Time: {reservation.suggested_time}
            </Text>

            <Text style={styles.infoText}>
              Suggested Guests: {reservation.suggested_guests_count}
            </Text>

            <Text style={styles.changeReason}>
              {reservation.change_reason}
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.acceptButton}
                activeOpacity={0.85}
                onPress={handleAcceptChange}>
                <Text style={styles.actionButtonText}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectButton}
                activeOpacity={0.85}
                onPress={handleRejectChange}>
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {isPastReservation &&
        reservation.status !== 'rejected' &&
        reservation.status !== 'cancelled' ? (
          <View style={styles.ratingCard}>
            <Text style={styles.sectionTitle}>Ratings & Visit Summary</Text>

            <Text style={styles.ratingInfoText}>
              Your rating to restaurant: Not rated yet
            </Text>

            <Text style={styles.ratingInfoText}>
              Restaurant rating to you: Not rated yet
            </Text>

            <Text style={styles.ratingHintText}>
              Rating system will show customer-to-restaurant and restaurant-to-customer feedback after the visit is confirmed.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.viewRestaurantButton}
          activeOpacity={0.85}
          onPress={handleOpenRestaurant}>
          <Text style={styles.viewRestaurantButtonText}>
            View Restaurant
          </Text>
        </TouchableOpacity>

        {canCancelReservation ? (
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.85}
            onPress={handleCancelReservation}>
            <Text style={styles.cancelButtonText}>
              Cancel Reservation
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ReservationDetails;