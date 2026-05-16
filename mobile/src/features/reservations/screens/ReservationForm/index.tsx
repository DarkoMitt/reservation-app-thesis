import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useReservationForm } from './logic';
import { styles } from './styles';

function ReservationForm(): React.JSX.Element {
  const {
    restaurant,
    reservationDate,
    reservationTime,
    selectedDate,
    selectedTime,
    showDatePicker,
    showTimePicker,
    guestsCount,
    setGuestsCount,
    specialRequest,
    setSpecialRequest,
    isSubmitting,
    availableGuests,
    isCheckingAvailability,
    handleGoBack,
    handleOpenDatePicker,
    handleOpenTimePicker,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  } = useReservationForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Reserve a Table</Text>

        <View style={styles.restaurantCard}>
          <Text style={styles.restaurantLabel}>Restaurant</Text>
          <Text style={styles.restaurantName}>
            {restaurant?.restaurant_name || restaurant?.name || 'Restaurant'}
          </Text>
          <Text style={styles.restaurantMeta}>
            {restaurant?.city} • {restaurant?.address}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Reservation Date</Text>

          <TouchableOpacity
            style={styles.pickerButton}
            activeOpacity={0.85}
            onPress={handleOpenDatePicker}>
            <Text
              style={
                reservationDate
                  ? styles.pickerValue
                  : styles.pickerPlaceholder
              }>
              {reservationDate || 'Select reservation date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Reservation Time</Text>

          <TouchableOpacity
            style={styles.pickerButton}
            activeOpacity={0.85}
            onPress={handleOpenTimePicker}>
            <Text
              style={
                reservationTime
                  ? styles.pickerValue
                  : styles.pickerPlaceholder
              }>
              {reservationTime || 'Select reservation time'}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              display="default"
              is24Hour
              onChange={handleTimeChange}
            />
          )}

          {isCheckingAvailability ? (
            <View style={styles.availabilityBox}>
              <Text style={styles.availabilityText}>
                Checking availability...
              </Text>
            </View>
          ) : availableGuests !== null ? (
            <View style={styles.availabilityBox}>
              <Text style={styles.availabilityText}>
                Available seats for this time slot:
              </Text>
              <Text style={styles.availabilityValue}>
                {availableGuests}
              </Text>
            </View>
          ) : null}

          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            style={styles.input}
            value={guestsCount}
            onChangeText={setGuestsCount}
            keyboardType="numeric"
            placeholder="Example: 4"
            placeholderTextColor="#8B8178"
          />

          <Text style={styles.label}>Special Request</Text>
          <TextInput
            style={styles.textArea}
            multiline
            value={specialRequest}
            onChangeText={setSpecialRequest}
            placeholder="Optional note for the restaurant..."
            placeholderTextColor="#8B8178"
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Your request will be sent to the restaurant and will remain pending
            until it is approved or rejected.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.85}
          disabled={isSubmitting}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Sending...' : 'Send Reservation Request'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ReservationForm;