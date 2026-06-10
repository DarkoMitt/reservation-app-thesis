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

import { useAdminDashboard, AdminTab } from './logic';
import { styles } from './styles';

const tabs: Array<{ key: AdminTab; label: string }> = [
  { key: 'pending', label: 'Pending' },
  { key: 'users', label: 'Users' },
  { key: 'customers', label: 'Customers' },
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'announcements', label: 'Alerts' },
];

const targets = [
  { key: 'all_users', label: 'All Users' },
  { key: 'all_customers', label: 'All Customers' },
  { key: 'all_restaurants', label: 'All Restaurants' },
  { key: 'specific_user', label: 'Specific User' },
  { key: 'specific_customer', label: 'Specific Customer' },
  { key: 'specific_restaurant', label: 'Specific Restaurant' },
];

function AdminDashboard(): React.JSX.Element {

  const {
    activeTab,
    setActiveTab,
    stats,
    pendingRestaurants,
    users,
    restaurants,
    isLoading,
    isRejectModalVisible,
    rejectionReason,
    setRejectionReason,
    openRejectModal,
    closeRejectModal,
    submitRejectRestaurant,
    announcementTitle,
    setAnnouncementTitle,
    announcementMessage,
    setAnnouncementMessage,
    announcementTarget,
    setAnnouncementTarget,
    selectedTargetUserId,
    setSelectedTargetUserId,
    handleApproveRestaurant,
    handleBanUser,
    handleUnbanUser,
    handleDeleteUser,
    handleBanRestaurant,
    handleUnbanRestaurant,
    handleDeleteRestaurant,
    handleSendAnnouncement,
    handleLogout,
    userSearch,
    setUserSearch,
    customerSearch,
    setCustomerSearch,
    restaurantSearch,
    setRestaurantSearch,
    recipientSearch,
    setRecipientSearch,
  } = useAdminDashboard();

  const filterBySearch = (items: any[], search: string) => {
    const value = search.toLowerCase().trim();

    if (!value) return items;

    return items.filter(item =>
      `${item.first_name || ''} ${item.last_name || ''} ${item.email || ''} ${item.phone || ''} ${item.restaurant_name || ''} ${item.city || ''}`
        .toLowerCase()
        .includes(value),
    );
  };

  const customers = users.filter(user => user.role === 'customer');

  const filteredUsers = filterBySearch(users, userSearch);
  const filteredCustomers = filterBySearch(customers, customerSearch);
  const filteredRestaurants = filterBySearch(restaurants, restaurantSearch);

  const selectedTargetNeedsUser =
    announcementTarget === 'specific_user' ||
    announcementTarget === 'specific_customer' ||
    announcementTarget === 'specific_restaurant';

  const targetUsers =
    announcementTarget === 'specific_restaurant'
      ? users.filter(user => user.role === 'restaurant')
      : announcementTarget === 'specific_customer'
        ? users.filter(user => user.role === 'customer')
        : users;

  const filteredTargetUsers = filterBySearch(targetUsers, recipientSearch);

  const renderUserCard = (user: any) => {
    const isBanned = user.status === 'banned';

    return (
      <View key={user.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              {user.first_name} {user.last_name}
            </Text>

            <Text style={styles.cardSubtitle}>
              {user.role} • {user.email}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isBanned && styles.statusBadgeDanger,
            ]}>
            <Text
              style={[
                styles.statusBadgeTextDark,
                isBanned && styles.statusBadgeTextLight,
              ]}>
              {user.status}
            </Text>
          </View>
        </View>

        <Text style={styles.infoText}>Phone: {user.phone}</Text>

        {user.role === 'customer' ? (
          <>
            <Text style={styles.infoText}>
              Trust Score: {user.trust_score ?? 0}
            </Text>
            <Text style={styles.infoText}>
              No-shows: {user.no_show_count ?? 0}
            </Text>
          </>
        ) : null}

        <View style={styles.actionsRow}>
          {isBanned ? (
            <TouchableOpacity
              style={styles.approveButton}
              activeOpacity={0.85}
              onPress={() => handleUnbanUser(user.id)}>
              <Text style={styles.actionButtonText}>Unban</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.rejectButton}
              activeOpacity={0.85}
              onPress={() => handleBanUser(user.id)}>
              <Text style={styles.actionButtonText}>Ban</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.85}
            onPress={() => handleDeleteUser(user.id)}>
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextBox}>
            <Text style={styles.title}>Admin Control Center</Text>
            <Text style={styles.subtitle}>
              Manage restaurants, customers, users and announcements.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCardPrimary}>
            <Text style={styles.statValue}>{stats.pending_restaurants}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValueDark}>{stats.active_users}</Text>
            <Text style={styles.statLabelDark}>Active Users</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValueDark}>{stats.approved_restaurants}</Text>
            <Text style={styles.statLabelDark}>Restaurants</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValueDark}>{stats.banned_users}</Text>
            <Text style={styles.statLabelDark}>Banned</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.85}
              style={[
                styles.tabChip,
                activeTab === tab.key && styles.activeTabChip,
              ]}
              onPress={() => setActiveTab(tab.key)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#8B1E3F" />
            <Text style={styles.loadingText}>Loading admin data...</Text>
          </View>
        ) : null}

        {!isLoading && activeTab === 'pending' ? (
          pendingRestaurants.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No pending restaurants</Text>
              <Text style={styles.emptyText}>
                New restaurant registrations will appear here.
              </Text>
            </View>
          ) : (
            pendingRestaurants.map(restaurant => (
              <View key={restaurant.restaurant_id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>
                      {restaurant.restaurant_name}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      {restaurant.restaurant_type} • {restaurant.cuisine_type}
                    </Text>
                  </View>

                  <View style={styles.statusBadgeWarning}>
                    <Text style={styles.statusBadgeText}>Pending</Text>
                  </View>
                </View>

                <Text style={styles.infoText}>Email: {restaurant.email}</Text>
                <Text style={styles.infoText}>Phone: {restaurant.phone}</Text>
                <Text style={styles.infoText}>City: {restaurant.city}</Text>
                <Text style={styles.infoText}>Address: {restaurant.address}</Text>
                <Text style={styles.infoText}>Max Guests: {restaurant.max_guests}</Text>

                <Text style={styles.description}>
                  {restaurant.description || 'No description provided.'}
                </Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    activeOpacity={0.85}
                    onPress={() => handleApproveRestaurant(restaurant.restaurant_id)}>
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
          )
        ) : null}

        {!isLoading && activeTab === 'users' ? (
          <>
            <TextInput
              style={styles.searchInput}
              value={userSearch}
              onChangeText={setUserSearch}
              placeholder="Search users by name, email or phone..."
              placeholderTextColor="#8B8178"
            />

            {filteredUsers.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No users found</Text>
                <Text style={styles.emptyText}>Try another search.</Text>
              </View>
            ) : (
              filteredUsers.map(renderUserCard)
            )}
          </>
        ) : null}

        {!isLoading && activeTab === 'customers' ? (
          <>
            <TextInput
              style={styles.searchInput}
              value={customerSearch}
              onChangeText={setCustomerSearch}
              placeholder="Search customers by name, email or phone..."
              placeholderTextColor="#8B8178"
            />

            {filteredCustomers.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No customers found</Text>
                <Text style={styles.emptyText}>Try another search.</Text>
              </View>
            ) : (
              filteredCustomers.map(renderUserCard)
            )}
          </>
        ) : null}

        {!isLoading && activeTab === 'restaurants' ? (
          <>
            <TextInput
              style={styles.searchInput}
              value={restaurantSearch}
              onChangeText={setRestaurantSearch}
              placeholder="Search restaurants by name, city or email..."
              placeholderTextColor="#8B8178"
            />

            {filteredRestaurants.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No restaurants found</Text>
                <Text style={styles.emptyText}>Try another search.</Text>
              </View>
            ) : (
              filteredRestaurants.map(restaurant => {
                const isBanned =
                  restaurant.status === 'banned' ||
                  restaurant.user_status === 'banned';

                return (
                  <View key={restaurant.restaurant_id} style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={styles.cardHeaderText}>
                        <Text style={styles.cardTitle}>
                          {restaurant.restaurant_name}
                        </Text>
                        <Text style={styles.cardSubtitle}>
                          {restaurant.restaurant_type} • {restaurant.city}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          isBanned && styles.statusBadgeDanger,
                        ]}>
                        <Text
                          style={[
                            styles.statusBadgeTextDark,
                            isBanned && styles.statusBadgeTextLight,
                          ]}>
                          {restaurant.status}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.infoText}>Email: {restaurant.email}</Text>
                    <Text style={styles.infoText}>Phone: {restaurant.phone}</Text>
                    <Text style={styles.infoText}>
                      Cuisine: {restaurant.cuisine_type || '-'}
                    </Text>
                    <Text style={styles.infoText}>
                      Address: {restaurant.address}
                    </Text>

                    <View style={styles.actionsRow}>
                      {isBanned ? (
                        <TouchableOpacity
                          style={styles.approveButton}
                          activeOpacity={0.85}
                          onPress={() =>
                            handleUnbanRestaurant(restaurant.restaurant_id)
                          }>
                          <Text style={styles.actionButtonText}>Unban</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.rejectButton}
                          activeOpacity={0.85}
                          onPress={() =>
                            handleBanRestaurant(restaurant.restaurant_id)
                          }>
                          <Text style={styles.actionButtonText}>Ban</Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.deleteButton}
                        activeOpacity={0.85}
                        onPress={() =>
                          handleDeleteRestaurant(restaurant.restaurant_id)
                        }>
                        <Text style={styles.actionButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
          </>
        ) : null}

        {!isLoading && activeTab === 'announcements' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Send Announcement</Text>
            <Text style={styles.description}>
              Send a notification to all users, customers, restaurants or one selected recipient.
            </Text>

            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={announcementTitle}
              onChangeText={setAnnouncementTitle}
              placeholder="Example: New app update"
              placeholderTextColor="#8B8178"
            />

            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={styles.textArea}
              value={announcementMessage}
              onChangeText={setAnnouncementMessage}
              placeholder="Write announcement message..."
              placeholderTextColor="#8B8178"
              multiline
            />

            <Text style={styles.inputLabel}>Send To</Text>

            <View style={styles.targetGrid}>
              {targets.map(target => (
                <TouchableOpacity
                  key={target.key}
                  activeOpacity={0.85}
                  style={[
                    styles.targetChip,
                    announcementTarget === target.key &&
                      styles.activeTargetChip,
                  ]}
                  onPress={() => {
                    setAnnouncementTarget(target.key);
                    setSelectedTargetUserId('');
                    setRecipientSearch('');
                  }}>
                  <Text
                    style={[
                      styles.targetChipText,
                      announcementTarget === target.key &&
                        styles.activeTargetChipText,
                    ]}>
                    {target.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedTargetNeedsUser ? (
              <>
                <Text style={styles.inputLabel}>Select Recipient</Text>

                <TextInput
                  style={styles.searchInput}
                  value={recipientSearch}
                  onChangeText={setRecipientSearch}
                  placeholder="Search recipient by name or email..."
                  placeholderTextColor="#8B8178"
                />

                <ScrollView
                  style={styles.recipientList}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator>
                  {filteredTargetUsers.map(user => (
                    <TouchableOpacity
                      key={user.id}
                      activeOpacity={0.85}
                      style={[
                        styles.recipientItem,
                        selectedTargetUserId === String(user.id) &&
                          styles.activeRecipientItem,
                      ]}
                      onPress={() => setSelectedTargetUserId(String(user.id))}>
                      <Text
                        style={[
                          styles.recipientName,
                          selectedTargetUserId === String(user.id) &&
                            styles.activeRecipientName,
                        ]}>
                        {user.first_name} {user.last_name}
                      </Text>
                      <Text style={styles.recipientMeta}>
                        {user.role} • {user.email}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            ) : null}

            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.85}
              onPress={handleSendAnnouncement}>
              <Text style={styles.actionButtonText}>Send Announcement</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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