import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCustomerDashboard } from './logic';
import { styles } from './styles';

function CustomerDashboard(): React.JSX.Element {
  const {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filters,
    restaurants,
    handleLogout,
  } = useCustomerDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 👋</Text>
            <Text style={styles.title}>Find your next reservation</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.8}
            onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
            <Text style={styles.profileInitials}>DM</Text>
          </TouchableOpacity>
        </View>

        {isProfileMenuOpen && (
          <View style={styles.profileMenu}>
            <Text style={styles.profileName}>Darko Mitovski</Text>

            <TouchableOpacity style={styles.profileMenuItem}>
              <Text style={styles.profileMenuText}>Profile Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem}>
              <Text style={styles.profileMenuText}>My Reservations</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

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
          <Text style={styles.sectionSubtitle}>{restaurants.length} places</Text>
        </View>

        <View style={styles.cardsWrapper}>
          {restaurants.map(restaurant => (
            <View key={restaurant.id} style={styles.card}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>{restaurant.type}</Text>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantMeta}>
                      {restaurant.city} • {restaurant.address}
                    </Text>
                  </View>

                  <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                </View>

                <Text style={styles.foodType}>{restaurant.foodType}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.status}>{restaurant.status}</Text>

                  <TouchableOpacity style={styles.viewButton} activeOpacity={0.85}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerDashboard;