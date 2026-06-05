import React from 'react';
import AppBottomNav from '../../../../shared/components/AppBottomNav';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMyReservations } from './logic';
import { styles } from './styles';

function MyReservations(): React.JSX.Element {
  const {
    filters,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    reservations,
    isLoading,
    handleGoBack,
    handleOpenReservation,
    bottomNavItems,
  } = useMyReservations();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Reservations</Text>

        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by restaurant, city or status..."
          placeholderTextColor="#8B8178"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.85}
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

        <Text style={styles.resultCount}>
          {reservations.length} reservations
        </Text>

        {isLoading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#8B1E3F" />
            <Text style={styles.loadingText}>Loading reservations...</Text>
          </View>
        ) : reservations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No reservations found</Text>
            <Text style={styles.emptyText}>
              Try changing your search or selected filter.
            </Text>
          </View>
        ) : (
          reservations.map(reservation => {
            const isPast =
              reservation.reservation_category === 'Past reservation';

            const isExpired =
              reservation.status === 'expired';

            return (
              <TouchableOpacity
                key={reservation.id}
                activeOpacity={0.85}
                style={[styles.card, isPast && styles.pastCard]}
                onPress={() => handleOpenReservation(reservation)}>

                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.restaurantName}>
                      {reservation.restaurant_name}
                    </Text>

                    <Text style={styles.restaurantMeta}>
                      {reservation.city} • {reservation.address}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.statusBadge,
                      isPast && styles.pastStatusBadge,
                    ]}>
                    {reservation.display_status}
                  </Text>
                </View>

                <Text style={styles.categoryText}>
                  {reservation.reservation_category}
                </Text>

                <Text style={styles.infoText}>
                  Date: {reservation.reservation_date}
                </Text>

                <Text style={styles.infoText}>
                  Time: {reservation.reservation_time}
                </Text>

                <Text style={styles.infoText}>
                  Guests: {reservation.guests_count}
                </Text>

                {reservation.status === 'waitlisted' ? (
                <Text style={styles.infoText}>
                  Waitlist Position: #{reservation.waitlist_position || '-'}
                </Text>
              ) : null}

                {isExpired ? (
                <Text style={styles.pastHintText}>
                  This reservation expired because the restaurant did not respond before the confirmation deadline.
                </Text>
              ) : null}

                {isPast && !isExpired ? (
                  <Text style={styles.pastHintText}>
                    This reservation has already passed.
                  </Text>
                ) : null}

                <Text style={styles.viewMoreText}>
                  Tap to view reservation details
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <AppBottomNav items={bottomNavItems} />
    </SafeAreaView>
  );
}

export default MyReservations;