import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
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
    ratingSummary,
    showRatingDetails,
    setShowRatingDetails,
    isLoadingReservation,
    isRespondingChange,
    reservationStatusLabel,
    rejectedStatusLabel,
    handleGoBack,
    handleReserve,
    handleAcceptChange,
    handleRejectChange,

    restaurantImages,
    menuImages,
    previewImageUri,
    handleOpenImagePreview,
    handleCloseImagePreview,
  } = useRestaurantDetails();

  const restaurantName =
    restaurant?.restaurant_name || restaurant?.name || 'Restaurant';

  const cuisineType =
    restaurant?.cuisine_type || restaurant?.foodType || 'Cuisine not added';

  const monThuHours = restaurant?.mon_thu_hours || 'Not added';
  const friSunHours = restaurant?.fri_sun_hours || 'Not added';

  const hasRestaurantImages = restaurantImages.length > 0;

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

        {hasRestaurantImages ? (
          <View style={styles.heroContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.heroGallery}>
              {restaurantImages.map((imageUri, index) => (
                <TouchableOpacity
                  key={`${imageUri}-${index}`}
                  activeOpacity={0.9}
                  style={styles.heroImageWrapper}
                  onPress={() => handleOpenImagePreview(imageUri)}>
                  <Image source={{ uri: imageUri }} style={styles.heroImageReal} />

                  <View style={styles.heroImageCounter}>
                    <Text style={styles.heroImageCounterText}>
                      {index + 1}/{restaurantImages.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.heroStatusBadgeFixed}>
              <Text
                style={[
                  styles.heroStatusText,
                  restaurant?.displayStatus !== 'Open now' && styles.closedStatusText,
                ]}>
                {restaurant?.displayStatus === 'Open now' ? '🟢 Open now' : '⚫ Closed'}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerMainInfo}>
              <Text style={styles.name}>{restaurantName}</Text>

              <Text style={styles.meta}>
                {restaurant?.city} • {restaurant?.address}
              </Text>

              <Text style={styles.foodType}>{cuisineType}</Text>
            </View>

            <View style={styles.ratingPill}>
              <Text style={styles.ratingPillText}>
                ★ {ratingSummary?.overall_rating || 0}/5
              </Text>
            </View>
          </View>

          <View style={styles.ratingRow}>

            {!hasRestaurantImages ? (
              <Text
                style={[
                  styles.status,
                  restaurant?.displayStatus !== 'Open now' && styles.closedStatus,
                ]}>
                {restaurant?.displayStatus === 'Open now' ? '🟢 Open now' : '⚫ Closed'}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.ratingSummaryCard}>
          <Text style={styles.ratingSummaryTitle}>Restaurant Rating</Text>

          <View style={styles.ratingMainRow}>
            <Text style={styles.ratingSummaryMain}>
              ★ {ratingSummary?.overall_rating || 0}/5
            </Text>

            <View style={styles.ratingReviewsBadge}>
              <Text style={styles.ratingReviewsBadgeText}>
                {ratingSummary?.total_reviews || 0} reviews
              </Text>
            </View>
          </View>

          <View style={styles.ratingCategoryGrid}>
            <View style={styles.ratingCategoryBox}>
              <Text style={styles.ratingCategoryIcon}>🍝</Text>
              <Text style={styles.ratingCategoryValue}>
                {ratingSummary?.food_rating || 0}/5
              </Text>
              <Text style={styles.ratingCategoryLabel}>Food</Text>
            </View>

            <View style={styles.ratingCategoryBox}>
              <Text style={styles.ratingCategoryIcon}>🤝</Text>
              <Text style={styles.ratingCategoryValue}>
                {ratingSummary?.service_rating || 0}/5
              </Text>
              <Text style={styles.ratingCategoryLabel}>Service</Text>
            </View>

            <View style={styles.ratingCategoryBox}>
              <Text style={styles.ratingCategoryIcon}>🏛️</Text>
              <Text style={styles.ratingCategoryValue}>
                {ratingSummary?.atmosphere_rating || 0}/5
              </Text>
              <Text style={styles.ratingCategoryLabel}>Atmosphere</Text>
            </View>
          </View>

          <Text style={styles.ratingSummarySub}>
            Most common price:{' '}
            {ratingSummary?.most_common_price_per_person
              ? `${ratingSummary.most_common_price_per_person} MKD per person`
              : 'Not enough data yet'}
          </Text>

          {showRatingDetails ? (
            <View style={styles.ratingDetailsBox}>
              <Text style={styles.ratingDetailText}>
                Food: {ratingSummary?.food_rating || 0}/5
              </Text>
              <Text style={styles.ratingDetailText}>
                Service: {ratingSummary?.service_rating || 0}/5
              </Text>
              <Text style={styles.ratingDetailText}>
                Atmosphere: {ratingSummary?.atmosphere_rating || 0}/5
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant Photos</Text>

          {restaurantImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryRow}>
              {restaurantImages.map((imageUri, index) => (
                <TouchableOpacity
                  key={`${imageUri}-thumb-${index}`}
                  activeOpacity={0.85}
                  style={styles.galleryImageWrapper}
                  onPress={() => handleOpenImagePreview(imageUri)}>
                  <Image source={{ uri: imageUri }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.description}>
              This restaurant has not added photos yet.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Menu Photos</Text>

          {menuImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryRow}>
              {menuImages.map((imageUri, index) => (
                <TouchableOpacity
                  key={`${imageUri}-menu-${index}`}
                  activeOpacity={0.85}
                  style={styles.menuImageWrapper}
                  onPress={() => handleOpenImagePreview(imageUri)}>
                  <Image source={{ uri: imageUri }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.description}>
              This restaurant has not added menu photos yet.
            </Text>
          )}
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
              Trust Score: {activeReservation.trust_score || 20}
            </Text>

            {activeReservation.status === 'change_requested' ? (
              <View style={styles.changeRequestBox}>
                <Text style={styles.changeRequestTitle}>Suggested Changes</Text>

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
                  Expires at: {activeReservation.change_expires_at}
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
                    <Text style={styles.rejectChangeButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
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

        <View style={styles.infoGrid}>
          <View style={styles.infoGridCard}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>🍴</Text>
            </View>
            <Text style={styles.infoGridTitle}>About</Text>
            <Text style={styles.infoGridText}>
              {restaurant?.description ||
                'This restaurant has not added a description yet.'}
            </Text>
          </View>

          <View style={styles.infoGridCard}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>🕒</Text>
            </View>
            <Text style={styles.infoGridTitle}>Working Hours</Text>
            <Text style={styles.infoGridText}>Mon - Thu: {monThuHours}</Text>
            <Text style={styles.infoGridText}>Fri - Sun: {friSunHours}</Text>
          </View>

          <View style={styles.infoGridCard}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>🏷️</Text>
            </View>
            <Text style={styles.infoGridTitle}>Cuisine</Text>
            <Text style={styles.infoGridText}>{cuisineType}</Text>
          </View>

          <View style={styles.infoGridCard}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>📍</Text>
            </View>
            <Text style={styles.infoGridTitle}>Address</Text>
            <Text style={styles.infoGridText}>
              {restaurant?.address}, {restaurant?.city}
            </Text>
          </View>
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

      <Modal
        visible={!!previewImageUri}
        transparent
        animationType="fade"
        onRequestClose={handleCloseImagePreview}>
        <View style={styles.imagePreviewOverlay}>
          <TouchableOpacity
            style={styles.imagePreviewCloseButton}
            activeOpacity={0.85}
            onPress={handleCloseImagePreview}>
            <Text style={styles.imagePreviewCloseText}>×</Text>
          </TouchableOpacity>

          {previewImageUri ? (
            <Image
              source={{ uri: previewImageUri }}
              style={styles.fullPreviewImage}
            />
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default RestaurantDetails;