import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRestaurantDashboard } from './logic';
import { styles } from './styles';

function RestaurantDashboard(): React.JSX.Element {
  const {
    restaurant,
    isLoading,
    handleOpenProfile,
    handleLogout,
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Restaurant Dashboard</Text>
            <Text style={styles.title}>
              {restaurant?.restaurant_name || 'Restaurant'}
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Account Status</Text>
          <Text style={styles.statusValue}>
            {restaurant?.status || 'Unknown'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={handleOpenProfile}>
          <Text style={styles.profileButtonText}>My Profile</Text>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {restaurant?.max_guests || 0}
            </Text>
            <Text style={styles.statLabel}>Max Guests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Requests</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant Information</Text>

          <Text style={styles.infoText}>
            Type: {restaurant?.restaurant_type || '-'}
          </Text>

          <Text style={styles.infoText}>
            Cuisine: {restaurant?.cuisine_type || '-'}
          </Text>

          <Text style={styles.infoText}>
            City: {restaurant?.city || '-'}
          </Text>

          <Text style={styles.infoText}>
            Address: {restaurant?.address || '-'}
          </Text>

          <Text style={styles.infoText}>
            Phone: {restaurant?.phone || '-'}
          </Text>

          <Text style={styles.infoText}>
            Email: {restaurant?.email || '-'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Hours</Text>
          <Text style={styles.description}>
            {restaurant?.working_hours || 'No working hours added.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.description}>
            {restaurant?.description || 'No description added yet.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next steps</Text>
          <Text style={styles.description}>
            Soon you will be able to manage reservation requests, view customer trust scores, and update your restaurant profile.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantDashboard;