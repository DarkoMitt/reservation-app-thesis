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

import { useCustomerProfile } from './logic';
import { styles } from './styles';

function CustomerProfile(): React.JSX.Element {
  const {
    customer,
    stats,
    isLoading,
    trustLevel,
    handleBack,

    isEditing,
    editedEmail,
    setEditedEmail,
    editedPreferences,
    isPreferencesOpen,
    setIsPreferencesOpen,
    FOOD_PREFERENCES,
    handlePreferenceSelect,
    handleStartEdit,
    handleCancelEdit,
    handleSaveProfile,
    isSaving,
    trustHistory,
  } = useCustomerProfile();

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

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          View your trust score, no-show history and reservation activity.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Profile Information</Text>

            {!isEditing ? (
              <TouchableOpacity onPress={handleStartEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.infoText}>
            Name: {customer?.first_name} {customer?.last_name}
          </Text>

          {!isEditing ? (
            <>
              <Text style={styles.infoText}>Email: {customer?.email || '-'}</Text>
              <Text style={styles.infoText}>Phone: {customer?.phone || '-'}</Text>
              <Text style={styles.infoText}>Age: {customer?.age || '-'}</Text>
              <Text style={styles.infoText}>
                Preferences: {customer?.preferences || 'No preferences'}
              </Text>
              <Text style={styles.infoText}>Status: {customer?.status || '-'}</Text>
            </>
          ) : (
            <>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={editedEmail}
                onChangeText={setEditedEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#8B8178"
              />

              <Text style={styles.infoText}>Phone: {customer?.phone || '-'}</Text>
              <Text style={styles.infoText}>Age: {customer?.age || '-'}</Text>

              <Text style={styles.inputLabel}>Preferences</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                activeOpacity={0.85}
                onPress={() => setIsPreferencesOpen(prev => !prev)}>
                <Text style={styles.dropdownText}>
                  {editedPreferences || 'No preferences'}
                </Text>
                <Text style={styles.dropdownIcon}>
                  {isPreferencesOpen ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {isPreferencesOpen ? (
                <View style={styles.dropdownList}>
                  {FOOD_PREFERENCES.map(preference => (
                    <TouchableOpacity
                      key={preference}
                      style={styles.dropdownItem}
                      activeOpacity={0.75}
                      onPress={() => handlePreferenceSelect(preference)}>
                      <Text style={styles.dropdownItemText}>{preference}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}

              <View style={styles.editButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  disabled={isSaving}
                  onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  disabled={isSaving}
                  onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trust Overview</Text>

          <View style={styles.trustScoreCircle}>
            <Text style={styles.trustScoreValue}>
              {customer?.trust_score ?? 0}
            </Text>
            <Text style={styles.trustScoreLabel}>Trust Score</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{trustLevel} Trust</Text>
          </View>

          <Text style={styles.infoText}>
            No-shows: {customer?.no_show_count ?? 0}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reservation Statistics</Text>

          <View style={styles.totalStatsCard}>
            <Text style={styles.totalStatsNumber}>
              {stats?.total_reservations ?? 0}
            </Text>
            <Text style={styles.totalStatsLabel}>Total Reservations</Text>
          </View>

          <View style={styles.statsGrid}>
            {[
              { label: 'Visited', value: stats?.visited_reservations ?? 0, icon: '✓' },
              { label: 'No-shows', value: stats?.no_show_reservations ?? 0, icon: '!' },
              { label: 'Cancelled', value: stats?.cancelled_reservations ?? 0, icon: '×' },
              { label: 'Pending', value: stats?.pending_reservations ?? 0, icon: '…' },
              { label: 'Approved', value: stats?.approved_reservations ?? 0, icon: '★' },
              { label: 'Rejected', value: stats?.rejected_reservations ?? 0, icon: '-' },
              { label: 'Changed', value: stats?.change_requested_reservations ?? 0, icon: '↔' },
              { label: 'Expired', value: stats?.expired_reservations ?? 0, icon: '⏱' },
            ].map(item => (
              <View key={item.label} style={styles.statBox}>
                <View style={styles.statIconCircle}>
                  <Text style={styles.statIcon}>{item.icon}</Text>
                </View>

                <View>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trust Score History</Text>

            {trustHistory.length === 0 ? (
              <Text style={styles.infoText}>No trust score changes yet.</Text>
            ) : (
              trustHistory.map(item => (
                <View key={item.id} style={styles.trustHistoryItem}>
                  <View style={styles.trustHistoryHeader}>
                    <Text
                      style={[
                        styles.trustHistoryChange,
                        item.change_value > 0
                          ? styles.positiveChange
                          : styles.negativeChange,
                      ]}>
                      {item.change_value > 0 ? '+' : ''}
                      {item.change_value}
                    </Text>

                    <Text style={styles.trustHistoryReason}>{item.reason}</Text>
                  </View>

                  <Text style={styles.trustHistoryScore}>
                    {item.old_score} → {item.new_score}
                  </Text>

                  <Text style={styles.trustHistoryDate}>
                    {new Date(item.created_at).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerProfile;