import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRestaurantProfile } from './logic';
import { styles } from './styles';

function RestaurantProfile(): React.JSX.Element {
  const {
    cuisineType,
    setCuisineType,
    address,
    setAddress,
    city,
    setCity,
    phone,
    setPhone,
    description,
    setDescription,
    maxGuests,
    setMaxGuests,
    workingHours,
    setWorkingHours,
    hasSmokingArea,
    setHasSmokingArea,
    hasOutdoorSeating,
    setHasOutdoorSeating,
    hasParking,
    setHasParking,
    hasWifi,
    setHasWifi,
    restaurantImage,
    setRestaurantImage,
    menuImage,
    setMenuImage,
    profileCompletion,
    isSaving,
    handleSave,
    handleGoBack,
  } = useRestaurantProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Restaurant Profile</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Profile Completion</Text>
          <Text style={styles.progressValue}>{profileCompletion}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Cuisine Type</Text>
          <TextInput
            style={styles.input}
            value={cuisineType}
            onChangeText={setCuisineType}
            placeholder="Example: Italian, Grill, Seafood..."
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Max Guests</Text>
          <TextInput
            style={styles.input}
            value={maxGuests}
            onChangeText={setMaxGuests}
            keyboardType="numeric"
            placeholder="Enter max guests"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Working Hours</Text>
          <TextInput
            style={styles.input}
            value={workingHours}
            onChangeText={setWorkingHours}
            placeholder="09:00 - 23:00"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Restaurant Description</Text>
          <TextInput
            style={styles.textArea}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Write something about your restaurant..."
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Restaurant Image</Text>
          <TextInput
            style={styles.input}
            value={restaurantImage}
            onChangeText={setRestaurantImage}
            placeholder="Paste restaurant image URL for now"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Menu Image</Text>
          <TextInput
            style={styles.input}
            value={menuImage}
            onChangeText={setMenuImage}
            placeholder="Paste menu image URL for now"
            placeholderTextColor="#8B8178"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.featuresTitle}>Restaurant Features</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Smoking Area</Text>
            <Switch value={hasSmokingArea} onValueChange={setHasSmokingArea} />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Outdoor Seating</Text>
            <Switch value={hasOutdoorSeating} onValueChange={setHasOutdoorSeating} />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Parking</Text>
            <Switch value={hasParking} onValueChange={setHasParking} />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Wi-Fi</Text>
            <Switch value={hasWifi} onValueChange={setHasWifi} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          disabled={isSaving}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantProfile;