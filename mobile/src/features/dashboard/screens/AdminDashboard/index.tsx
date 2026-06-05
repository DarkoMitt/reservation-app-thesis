import React from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAdminDashboard } from './logic';
import { styles } from './styles';

function AdminDashboard(): React.JSX.Element {
  const {
    pendingRestaurants,
    isLoading,
    handleApproveRestaurant,
    openRejectModal,
    isRejectModalVisible,
    rejectionReason,
    setRejectionReason,
    closeRejectModal,
    submitRejectRestaurant,
    handleLogout,
  } = useAdminDashboard();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Pending restaurant approvals</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{pendingRestaurants.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#8B1E3F" />
        ) : (
          pendingRestaurants.map(restaurant => (
            <View key={restaurant.restaurant_id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.restaurantName}>
                  {restaurant.restaurant_name}
                </Text>
                <Text style={styles.restaurantType}>
                  {restaurant.restaurant_type}
                </Text>
              </View>

              <Text style={styles.infoText}>Email: {restaurant.email}</Text>
              <Text style={styles.infoText}>Phone: {restaurant.phone}</Text>
              <Text style={styles.infoText}>City: {restaurant.city}</Text>
              <Text style={styles.infoText}>Address: {restaurant.address}</Text>
              <Text style={styles.infoText}>Cuisine: {restaurant.cuisine_type}</Text>
              <Text style={styles.infoText}>Max Guests: {restaurant.max_guests}</Text>

              <Text style={styles.infoText}>Working Hours:</Text>
              <Text style={styles.description}>{restaurant.working_hours}</Text>

              <Text style={styles.infoText}>Description:</Text>
              <Text style={styles.description}>
                {restaurant.description || 'No description provided.'}
              </Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.approveButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    handleApproveRestaurant(restaurant.restaurant_id)
                  }>
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rejectButton}
                  activeOpacity={0.85}
                  onPress={() => openRejectModal(restaurant.restaurant_id)}>
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        transparent
        visible={isRejectModalVisible}
        animationType="fade"
        onRequestClose={closeRejectModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Reject restaurant</Text>
            <Text style={styles.modalSubtitle}>
              Write a reason that will be shown to the restaurant.
            </Text>

            <TextInput
              style={styles.reasonInput}
              placeholder="Example: Missing business registration number..."
              placeholderTextColor="#8B8178"
              multiline
              value={rejectionReason}
              onChangeText={setRejectionReason}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.85}
                onPress={closeRejectModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectConfirmButton}
                activeOpacity={0.85}
                onPress={submitRejectRestaurant}>
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default AdminDashboard;