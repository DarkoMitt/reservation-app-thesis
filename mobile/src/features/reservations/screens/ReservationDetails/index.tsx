import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const renderStars = (value: string, onChange: (value: string) => void) => (
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

  canRequestReservationChange,
  customerChangeButtonLabel,

  isChangeFormOpen,
  changeDate,
  setChangeDate,
  changeTime,
  setChangeTime,
  changeGuestsCount,
  setChangeGuestsCount,
  customerChangeReason,
  setCustomerChangeReason,
  isSubmittingCustomerChange,
  handleOpenCustomerChangeForm,
  handleCancelCustomerChangeForm,
  submitCustomerChangeRequest,

  isChangeDatePickerOpen,
  isChangeTimePickerOpen,
  changeDatePickerValue,
  changeTimePickerValue,
  openChangeDatePicker,
  openChangeTimePicker,
  handleChangeDatePickerChange,
  handleChangeTimePickerChange,

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

  const renderInfoRow = (icon: string, label: string, value: string | number) => (
    <View style={styles.infoRow}>
      <View style={styles.infoIconBox}>
        <Text style={styles.infoIcon}>{icon}</Text>
      </View>

      <View style={styles.infoTextBox}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

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

        <View style={styles.restaurantHeroCard}>
          <View style={styles.restaurantIconBox}>
            <Text style={styles.restaurantIcon}>🍽️</Text>
          </View>

          <View style={styles.restaurantHeroInfo}>
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
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📌</Text>
            <Text style={styles.sectionTitle}>Reservation Info</Text>
          </View>

          {isExpiredReservation ? (
            <Text style={styles.pastLabel}>Expired Reservation</Text>
          ) : isPastReservation ? (
            <Text style={styles.pastLabel}>Past Reservation</Text>
          ) : (
            <Text style={styles.upcomingLabel}>Active / Upcoming</Text>
          )}

          {renderInfoRow('📅', 'Date', reservation.reservation_date)}
          {renderInfoRow('🕒', 'Time', reservation.reservation_time)}
          {renderInfoRow('👥', 'Guests', reservation.guests_count)}

          {reservation.special_request
            ? renderInfoRow('💬', 'Special Request', reservation.special_request)
            : null}

          {reservation.status === 'waitlisted' ? (
            <View style={styles.waitlistInfoBox}>
              <Text style={styles.waitlistTitle}>🪑 Waitlisted Reservation</Text>

              <Text style={styles.waitlistText}>
                Position: #{reservation.waitlist_position || '-'}
              </Text>

              <Text style={styles.waitlistText}>
                The restaurant is currently full for this time slot. If enough
                seats become available, your request will automatically move to
                pending restaurant confirmation.
              </Text>
            </View>
          ) : null}
        </View>

        {isExpiredReservation ? (
          <View style={styles.noticeCardDanger}>
            <Text style={styles.noticeTitleDanger}>⏱️ Reservation Expired</Text>

            <Text style={styles.noticeTextDanger}>
              {reservation.rejection_reason ||
                'The restaurant did not respond before the confirmation deadline, so this reservation request was automatically cancelled.'}
            </Text>
          </View>
        ) : null}

        {reservation.status === 'rejected' ? (
          <View style={styles.noticeCardDanger}>
            <Text style={styles.noticeTitleDanger}>❌ Reservation Rejected</Text>

            <Text style={styles.noticeTextDanger}>
              {reservation.rejection_reason || 'No reason provided.'}
            </Text>
          </View>
        ) : null}

        {reservation.status === 'cancelled' ? (
          <View style={styles.noticeCardNeutral}>
            <Text style={styles.noticeTitleNeutral}>🚫 Reservation Cancelled</Text>

            <Text style={styles.noticeTextNeutral}>
              This reservation has been cancelled and is no longer active.
            </Text>
          </View>
        ) : null}

        {reservation.status === 'change_requested' && !isPastReservation ? (
          <View style={styles.changeCard}>
            <Text style={styles.changeTitle}>🔄 Restaurant Suggested Changes</Text>

            {renderInfoRow('📅', 'Suggested Date', reservation.suggested_date || '-')}
            {renderInfoRow('🕒', 'Suggested Time', reservation.suggested_time || '-')}
            {renderInfoRow(
              '👥',
              'Suggested Guests',
              reservation.suggested_guests_count || '-',
            )}

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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>⭐</Text>
              <Text style={styles.sectionTitle}>Ratings & Visit Summary</Text>
            </View>

            {customerToRestaurantRating ? (
              <>
                {renderInfoRow(
                  '⭐',
                  'Your rating',
                  `${customerToRestaurantRating.overall_rating}/5`,
                )}
                {renderInfoRow(
                  '🍝',
                  'Food',
                  `${customerToRestaurantRating.food_rating}/5`,
                )}
                {renderInfoRow(
                  '🤝',
                  'Service',
                  `${customerToRestaurantRating.service_rating}/5`,
                )}
                {renderInfoRow(
                  '🏛️',
                  'Atmosphere',
                  `${customerToRestaurantRating.atmosphere_rating}/5`,
                )}
                {renderInfoRow(
                  '💰',
                  'Price per person',
                  customerToRestaurantRating.price_per_person
                    ? `${customerToRestaurantRating.price_per_person} MKD`
                    : '-',
                )}

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
                You can rate the restaurant only after the restaurant confirms
                your visit.
              </Text>
            )}

            <View style={styles.divider} />

            {renderInfoRow(
              '👤',
              'Restaurant rating to you',
              restaurantToCustomerRating
                ? `${restaurantToCustomerRating.overall_rating}/5`
                : 'Not rated yet',
            )}
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.viewRestaurantButton}
          activeOpacity={0.85}
          onPress={handleOpenRestaurant}>
          <Text style={styles.viewRestaurantButtonText}>
            🍽️ View Restaurant
          </Text>
        </TouchableOpacity>

        {canCancelReservation ? (
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.85}
            onPress={handleCancelReservation}>
            <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
          </TouchableOpacity>
        ) : null}

        {canRequestReservationChange ? (
          <TouchableOpacity
            style={styles.changeReservationButton}
            activeOpacity={0.85}
            onPress={handleOpenCustomerChangeForm}>
            <Text style={styles.changeReservationButtonText}>
              {customerChangeButtonLabel}
            </Text>
          </TouchableOpacity>
        ) : null}

        {isChangeFormOpen ? (
          <View style={styles.changeRequestCard}>
            <Text style={styles.changeRequestTitle}>
              Change Reservation
            </Text>

            <TouchableOpacity
              style={styles.changeInput}
              activeOpacity={0.85}
              onPress={openChangeDatePicker}>
              <Text style={styles.changeInputText}>
                {changeDate || 'Select date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.changeInput}
              activeOpacity={0.85}
              onPress={openChangeTimePicker}>
              <Text style={styles.changeInputText}>
                {changeTime || 'Select time'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.changeInput}
              value={changeGuestsCount}
              onChangeText={setChangeGuestsCount}
              keyboardType="numeric"
              placeholder="Guests Count"
              placeholderTextColor="#8B8178"
            />

            <TextInput
              style={styles.changeReasonInput}
              multiline
              value={customerChangeReason}
              onChangeText={setCustomerChangeReason}
              placeholder="Reason for change..."
              placeholderTextColor="#8B8178"
            />

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleCancelCustomerChangeForm}>
                <Text style={styles.actionButtonText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptButton}
                disabled={isSubmittingCustomerChange}
                onPress={submitCustomerChangeRequest}>
                <Text style={styles.actionButtonText}>
                  {isSubmittingCustomerChange
                    ? 'Sending...'
                    : 'Send Request'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>
      {isChangeDatePickerOpen ? (
        <DateTimePicker
          value={changeDatePickerValue}
          mode="date"
          display="calendar"
          onChange={handleChangeDatePickerChange}
        />
      ) : null}

      {isChangeTimePickerOpen ? (
        <DateTimePicker
          value={changeTimePickerValue}
          mode="time"
          is24Hour
          display="clock"
          onChange={handleChangeTimePickerChange}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default ReservationDetails;