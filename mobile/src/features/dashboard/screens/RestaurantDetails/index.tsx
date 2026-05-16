import React from 'react';
import {
  ActivityIndicator,
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
    isLoadingReservation,
    reservationStatusLabel,
    handleGoBack,
    handleReserve,
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
              Date: {activeReservation.reservation_date}
            </Text>

            <Text style={styles.reservationInfoText}>
              Time: {activeReservation.reservation_time}
            </Text>

            <Text style={styles.reservationInfoText}>
              Guests: {activeReservation.guests_count}
            </Text>

            <Text style={styles.reservationInfoText}>
              Trust Score: {activeReservation.trust_score || 100}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.reserveButton}
            activeOpacity={0.85}
            onPress={handleReserve}>
            <Text style={styles.reserveButtonText}>Reserve a Table</Text>
          </TouchableOpacity>
        )}

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