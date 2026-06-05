import React from 'react';
import AppBottomNav from '../../../../shared/components/AppBottomNav';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useRestaurantProfile } from './logic';
import { styles } from './styles';

function RestaurantProfile(): React.JSX.Element {
  const {
    cuisineType,
    setCuisineType,
    cuisineOptions,
    isCuisineDropdownOpen,
    setIsCuisineDropdownOpen,
    handleSelectCuisineType,
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

    activeTimePicker,
    timePickerDate,
    openTimePicker,
    handleTimePickerChange,

    monThuHours,
    friSunHours,

    restaurantImages,
    menuImages,
    previewImageUri,
    handleOpenImagePreview,
    handleCloseImagePreview,
    hasSmokingArea,
    setHasSmokingArea,
    hasOutdoorSeating,
    setHasOutdoorSeating,
    hasParking,
    setHasParking,
    hasWifi,
    setHasWifi,
    ratingSummary,
    showRatingDetails,
    setShowRatingDetails,
    profileCompletion,
    isSaving,
    handleSave,
    handleGoBack,
    pickRestaurantImages,
    pickMenuImages,
    removeRestaurantImage,
    removeMenuImage,
    bottomNavItems,
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

        <View style={styles.ratingSummaryCard}>
          <Text style={styles.ratingSummaryTitle}>Restaurant Rating</Text>

          <Text style={styles.ratingSummaryMain}>
            ★ {ratingSummary?.overall_rating || 0}/5
          </Text>

          <Text style={styles.ratingSummarySub}>
            Based on {ratingSummary?.total_reviews || 0} customer reviews
          </Text>

          <Text style={styles.ratingSummarySub}>
            Most common price:{' '}
            {ratingSummary?.most_common_price_per_person
              ? `${ratingSummary.most_common_price_per_person} MKD per person`
              : 'Not enough data yet'}
          </Text>

          <TouchableOpacity
            style={styles.ratingDetailsButton}
            activeOpacity={0.85}
            onPress={() => setShowRatingDetails(!showRatingDetails)}>
            <Text style={styles.ratingDetailsButtonText}>
              {showRatingDetails ? 'Hide detailed ratings' : 'Show detailed ratings'}
            </Text>
          </TouchableOpacity>

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
          <Text style={styles.label}>Cuisine Type</Text>

            <TouchableOpacity
              style={styles.dropdownButton}
              activeOpacity={0.85}
              onPress={() => setIsCuisineDropdownOpen(!isCuisineDropdownOpen)}>
              <Text
                style={[
                  styles.dropdownButtonText,
                  !cuisineType && styles.dropdownPlaceholderText,
                ]}>
                {cuisineType || 'Select cuisine type'}
              </Text>

              <Text style={styles.dropdownArrow}>
                {isCuisineDropdownOpen ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {isCuisineDropdownOpen ? (
              <View style={styles.dropdownList}>
                {cuisineOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownItem,
                      cuisineType === option && styles.activeDropdownItem,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => handleSelectCuisineType(option)}>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        cuisineType === option && styles.activeDropdownItemText,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}

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

          <Text style={styles.label}>Mon - Thu</Text>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.timeInput}
              activeOpacity={0.85}
              onPress={() => openTimePicker('monThuStart')}>
              <Text style={styles.timeInputText}>
                {monThuHours.split(' - ')[0] || 'Start'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.timeSeparator}>-</Text>

            <TouchableOpacity
              style={styles.timeInput}
              activeOpacity={0.85}
              onPress={() => openTimePicker('monThuEnd')}>
              <Text style={styles.timeInputText}>
                {monThuHours.split(' - ')[1] || 'End'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Fri - Sun</Text>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.timeInput}
              activeOpacity={0.85}
              onPress={() => openTimePicker('friSunStart')}>
              <Text style={styles.timeInputText}>
                {friSunHours.split(' - ')[0] || 'Start'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.timeSeparator}>-</Text>

            <TouchableOpacity
              style={styles.timeInput}
              activeOpacity={0.85}
              onPress={() => openTimePicker('friSunEnd')}>
              <Text style={styles.timeInputText}>
                {friSunHours.split(' - ')[1] || 'End'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Restaurant Description</Text>
          <TextInput
            style={styles.textArea}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Write something about your restaurant..."
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Restaurant Images</Text>

          <TouchableOpacity
            style={styles.imageButton}
            activeOpacity={0.85}
            disabled={isSaving}
            onPress={pickRestaurantImages}>
            <Text style={styles.imageButtonText}>
              {isSaving ? 'Uploading...' : 'Add Restaurant Images'}
            </Text>
          </TouchableOpacity>

          <View style={styles.galleryGrid}>
            {restaurantImages.map(imageUri => (
              <TouchableOpacity
                key={imageUri}
                style={styles.thumbnailWrapper}
                activeOpacity={0.85}
                onPress={() => handleOpenImagePreview(imageUri)}>
                <Image source={{ uri: imageUri }} style={styles.thumbnailImage} />

                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeRestaurantImage(imageUri)}>
                  <Text style={styles.removeImageText}>×</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Menu Images</Text>

          <TouchableOpacity
            style={styles.imageButton}
            activeOpacity={0.85}
            disabled={isSaving}
            onPress={pickMenuImages}>
            <Text style={styles.imageButtonText}>
              {isSaving ? 'Uploading...' : 'Add Menu Images'}
            </Text>
          </TouchableOpacity>

          <View style={styles.galleryGrid}>
            {menuImages.map(imageUri => (
              <TouchableOpacity
                key={imageUri}
                style={styles.thumbnailWrapper}
                activeOpacity={0.85}
                onPress={() => handleOpenImagePreview(imageUri)}>
                <Image source={{ uri: imageUri }} style={styles.thumbnailImage} />

                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeMenuImage(imageUri)}>
                  <Text style={styles.removeImageText}>×</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
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

      {activeTimePicker !== null ? (
        <DateTimePicker
          value={timePickerDate}
          mode="time"
          is24Hour
          display="clock"
          onChange={handleTimePickerChange}
        />
      ) : null}

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

      <AppBottomNav items={bottomNavItems} />
    </SafeAreaView>
  );
}
export default RestaurantProfile;