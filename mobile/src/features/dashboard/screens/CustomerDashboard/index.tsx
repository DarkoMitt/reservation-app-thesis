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

import { useCustomerDashboard } from './logic';
import { styles } from './styles';

const getRestaurantTypeIcon = (type?: string) => {
  const value = (type || '').toLowerCase();

  if (value.includes('cafe') || value.includes('coffee')) return '☕';
  if (value.includes('bar') || value.includes('lounge')) return '🍸';
  if (value.includes('fast')) return '🍔';
  if (value.includes('pizza')) return '🍕';
  if (value.includes('bakery')) return '🥐';

  return '🍽️';
};

const getStatusStyle = (status?: string) => {
  const value = (status || '').toLowerCase();

  if (value.includes('open')) {
    return {
      label: 'Open Now',
      badgeStyle: styles.statusBadgeOpen,
      dotStyle: styles.statusDotOpen,
      textStyle: styles.statusTextOpen,
    };
  }

  if (value.includes('busy') || value.includes('fully')) {
    return {
      label: value.includes('fully') ? 'Fully Booked' : 'Busy',
      badgeStyle: styles.statusBadgeBusy,
      dotStyle: styles.statusDotBusy,
      textStyle: styles.statusTextBusy,
    };
  }

  return {
    label: 'Closed',
    badgeStyle: styles.statusBadgeClosed,
    dotStyle: styles.statusDotClosed,
    textStyle: styles.statusTextClosed,
  };
};

const getReservationsText = (count?: number) => {
  const value = Number(count || 0);

  if (value === 1) {
    return '1 Reservation';
  }

  return `${value} Reservations`;
};

function CustomerDashboard(): React.JSX.Element {
  const {
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filters,
    restaurants,
    isLoadingRestaurants,
    handleOpenMyReviews,
    handleLogout,
    handleOpenRestaurant,
    handleOpenMyReservations,
    handleOpenProfile,
    unreadNotificationsCount,
    handleOpenNotifications,
  } = useCustomerDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.headerTitleBox}>
            <Text style={styles.title}>Find your next reservation</Text>
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
          </View>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cafes, event venues..."
          placeholderTextColor="#8B8178"
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.8}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended places</Text>
          <Text style={styles.sectionSubtitle}>
            {restaurants.length} places
          </Text>
        </View>

        {isLoadingRestaurants ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#8B1E3F" />
            <Text style={styles.loadingText}>Loading restaurants...</Text>
          </View>
        ) : restaurants.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptyText}>
              Try changing the search or selected filter.
            </Text>
          </View>
        ) : (
          <View style={styles.cardsWrapper}>
            {restaurants.map(restaurant => {
              const status = getStatusStyle(restaurant.displayStatus);
              const rating = Number(restaurant.average_rating || 0).toFixed(1);
              const reservationsCount = Number(restaurant.visit_count || 0);

              return (
                <View key={restaurant.id} style={styles.card}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.typeIconCircle}>
                      <Text style={styles.typeIcon}>
                        {getRestaurantTypeIcon(restaurant.restaurant_type)}
                      </Text>
                    </View>

                    <View style={[styles.statusBadge, status.badgeStyle]}>
                      <View style={[styles.statusDot, status.dotStyle]} />
                      <Text style={[styles.statusBadgeText, status.textStyle]}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.restaurantName}>
                    {restaurant.restaurant_name}
                  </Text>

                  <View style={styles.locationRow}>
                    <Text style={styles.locationIcon}>⌖</Text>
                    <Text style={styles.restaurantMeta}>
                      {restaurant.city || 'City not added'}
                    </Text>
                  </View>

                  <View style={styles.cuisineRow}>
                    <View style={styles.cuisineChip}>
                      <Text style={styles.cuisineChipText}>
                        {restaurant.cuisine_type || 'Cuisine not added'}
                      </Text>
                    </View>

                    <View style={styles.typeChip}>
                      <Text style={styles.typeChipText}>
                        {restaurant.restaurant_type || 'Restaurant'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>●</Text>
                      <Text style={styles.statValue}>{status.label}</Text>
                      <Text style={styles.statLabel}>Status</Text>
                    </View>

                    <View style={styles.statDivider} />

                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>★</Text>
                      <Text style={styles.statValue}>{rating}</Text>
                      <Text style={styles.statLabel}>Avg rating</Text>
                    </View>

                    <View style={styles.statDivider} />

                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>👥</Text>
                      <Text style={styles.statValue}>
                        {reservationsCount}
                      </Text>
                      <Text style={styles.statLabel}>Reservations</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.85}
                    onPress={() => handleOpenRestaurant(restaurant)}>
                    <Text style={styles.viewButtonText}>
                      👁 View Restaurant
                    </Text>
                    <Text style={styles.viewButtonArrow}>›</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          activeOpacity={0.85}>
          <Text style={[styles.bottomNavIcon, styles.bottomNavTextActive]}>⌂</Text>
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenMyReservations}>
          <Text style={styles.bottomNavIcon}>◷</Text>
          <Text style={styles.bottomNavText}>Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenMyReviews}>
          <Text style={styles.bottomNavIcon}>★</Text>
          <Text style={styles.bottomNavText}>Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          activeOpacity={0.85}
          onPress={handleOpenProfile}>
          <Text style={styles.bottomNavIcon}>◉</Text>
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
    </SafeAreaView>
  );
}

export default CustomerDashboard;