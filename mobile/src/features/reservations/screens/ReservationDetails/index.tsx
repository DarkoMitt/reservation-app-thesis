import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { useReservationDetails } from './logic';
import { styles } from './styles';

const priceOptions = ['500', '1000', '1500', '2500', '4000', '6000+'];

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

function ReservationDetails(): React.JSX.Element {
  const {
    reservation,
    isPastReservation,
    isExpiredReservation,
    canCancelReservation,
    handleGoBack,
    handleOpenRestaurant,
    handleCancelReservation,
    handleAcceptChange,
    handleRejectChange,

    customerToRestaurantRating,
    restaurantToCustomerRating,
    canRateRestaurant,

    foodRating,
    setFoodRating,
    serviceRating,
    setServiceRating,
    atmosphereRating,
    setAtmosphereRating,
    pricePerPerson,
    setPricePerPerson,
    reviewText,
    setReviewText,
    isSubmittingRating,
    submitCustomerRating,
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
          <Text style={styles.restaurantName}>{reservation.restaurant_name}</Text>

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

          {isExpiredReservation ? (
            <Text style={styles.pastLabel}>Expired Reservation</Text>
          ) : isPastReservation ? (
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

        {isExpiredReservation ? (
          <View style={styles.rejectedCard}>
            <Text style={styles.rejectedTitle}>Reservation Expired</Text>

            <Text style={styles.rejectedReason}>
              {reservation.rejection_reason ||
                'The restaurant did not respond before the confirmation deadline, so this reservation request was automatically cancelled.'}
            </Text>
          </View>
        ) : null}

        {reservation.status === 'rejected' ? (
          <View style={styles.rejectedCard}>
            <Text style={styles.rejectedTitle}>Reservation Rejected</Text>

            <Text style={styles.rejectedReason}>
              {reservation.rejection_reason || 'No reason provided.'}
            </Text>
          </View>
        ) : null}

        {reservation.status === 'change_requested' && !isPastReservation ? (
          <View style={styles.changeCard}>
            <Text style={styles.changeTitle}>Restaurant Suggested Changes</Text>

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
        !isExpiredReservation &&
        reservation.status !== 'rejected' &&
        reservation.status !== 'cancelled' ? (
          <View style={styles.ratingCard}>
            <Text style={styles.sectionTitle}>Ratings & Visit Summary</Text>

            {customerToRestaurantRating ? (
              <>
                <Text style={styles.ratingInfoText}>
                  Your rating to restaurant: {customerToRestaurantRating.overall_rating}/5
                </Text>
                <Text style={styles.ratingInfoText}>
                  Food: {customerToRestaurantRating.food_rating}/5
                </Text>
                <Text style={styles.ratingInfoText}>
                  Service: {customerToRestaurantRating.service_rating}/5
                </Text>
                <Text style={styles.ratingInfoText}>
                  Atmosphere: {customerToRestaurantRating.atmosphere_rating}/5
                </Text>
                <Text style={styles.ratingInfoText}>
                  Price per person:{' '}
                  {customerToRestaurantRating.price_per_person
                    ? `${customerToRestaurantRating.price_per_person} MKD`
                    : '-'}
                </Text>
                {customerToRestaurantRating.review_text ? (
                  <Text style={styles.ratingInfoText}>
                    Review: {customerToRestaurantRating.review_text}
                  </Text>
                ) : null}
              </>
            ) : canRateRestaurant ? (
              <View style={styles.ratingForm}>
                <Text style={styles.ratingHintText}>
                  Rate your restaurant experience
                </Text>

                <Text style={styles.ratingLabel}>Food</Text>
                {renderStars(foodRating, setFoodRating)}

                <Text style={styles.ratingLabel}>Service</Text>
                {renderStars(serviceRating, setServiceRating)}

                <Text style={styles.ratingLabel}>Atmosphere</Text>
                {renderStars(atmosphereRating, setAtmosphereRating)}

                <Text style={styles.ratingLabel}>Price per person</Text>
                <View style={styles.priceOptionsGrid}>
                  {priceOptions.map(price => (
                    <TouchableOpacity
                      key={price}
                      activeOpacity={0.85}
                      style={[
                        styles.priceOptionChip,
                        pricePerPerson === price && styles.activePriceOptionChip,
                      ]}
                      onPress={() => setPricePerPerson(price)}>
                      <Text
                        style={[
                          styles.priceOptionText,
                          pricePerPerson === price &&
                            styles.activePriceOptionText,
                        ]}>
                        {price} MKD
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={styles.ratingTextArea}
                  value={reviewText}
                  onChangeText={setReviewText}
                  multiline
                  placeholder="Write your review..."
                  placeholderTextColor="#8B8178"
                />

                <TouchableOpacity
                  style={styles.submitRatingButton}
                  disabled={isSubmittingRating}
                  onPress={submitCustomerRating}>
                  <Text style={styles.submitRatingButtonText}>
                    {isSubmittingRating ? 'Submitting...' : 'Submit Rating'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.ratingInfoText}>
                You can rate the restaurant only after the restaurant confirms your visit.
              </Text>
            )}

            <Text style={styles.ratingInfoText}>
              Restaurant rating to you:{' '}
              {restaurantToCustomerRating
                ? `${restaurantToCustomerRating.overall_rating}/5`
                : 'Not rated yet'}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.viewRestaurantButton}
          activeOpacity={0.85}
          onPress={handleOpenRestaurant}>
          <Text style={styles.viewRestaurantButtonText}>View Restaurant</Text>
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