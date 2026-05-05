import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from '../../../../shared/components/BackButton';
import { useRestaurantRegister } from './logic';
import { styles } from './styles';

function RestaurantRegisterScreen(): React.JSX.Element {
  const {
    form,
    errors,
    handleChange,
    handleRegister,
    COUNTRIES,
    CITIES_BY_COUNTRY,
    RESTAURANT_TYPES,
    cuisineOptions,
    isCountryOpen,
    setIsCountryOpen,
    handleCountrySelect,
    isCityOpen,
    setIsCityOpen,
    handleCitySelect,
    isRestaurantTypeOpen,
    setIsRestaurantTypeOpen,
    handleRestaurantTypeSelect,
    isCuisineTypeOpen,
    setIsCuisineTypeOpen,
    handleCuisineTypeSelect,
    isTimePickerVisible,
    openTimePicker,
    handleTimeChange,
  } = useRestaurantRegister();

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text style={styles.title}>Create Restaurant Account</Text>
        <Text style={styles.subtitle}>
          Register your restaurant and start managing reservations digitally.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Restaurant name"
            placeholderTextColor="#9A8C7F"
            value={form.restaurantName}
            onChangeText={value => handleChange('restaurantName', value)}
          />
          {errors.restaurantName ? (
            <Text style={styles.error}>{errors.restaurantName}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.85}
            onPress={() => setIsCountryOpen(prev => !prev)}>
            <Text
              style={form.country ? styles.dropdownText : styles.dropdownPlaceholder}>
              {form.country || 'Country'}
            </Text>
            <Text style={styles.dropdownIcon}>{isCountryOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {errors.country ? <Text style={styles.error}>{errors.country}</Text> : null}

          {isCountryOpen ? (
            <View style={styles.dropdownList}>
              {COUNTRIES.map(country => (
                <TouchableOpacity
                  key={country}
                  style={styles.dropdownItem}
                  activeOpacity={0.75}
                  onPress={() => handleCountrySelect(country)}>
                  <Text style={styles.dropdownItemText}>{country}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.dropdownButton,
              !form.country && styles.disabledDropdown,
            ]}
            activeOpacity={0.85}
            disabled={!form.country}
            onPress={() => setIsCityOpen(prev => !prev)}>
            <Text style={form.city ? styles.dropdownText : styles.dropdownPlaceholder}>
              {form.city || 'City'}
            </Text>
            <Text style={styles.dropdownIcon}>{isCityOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {errors.city ? <Text style={styles.error}>{errors.city}</Text> : null}

          {isCityOpen && form.country ? (
            <View style={styles.dropdownList}>
              {CITIES_BY_COUNTRY[form.country].map(city => (
                <TouchableOpacity
                  key={city}
                  style={styles.dropdownItem}
                  activeOpacity={0.75}
                  onPress={() => handleCitySelect(city)}>
                  <Text style={styles.dropdownItemText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Street address"
            placeholderTextColor="#9A8C7F"
            value={form.streetAddress}
            onChangeText={value => handleChange('streetAddress', value)}
          />
          {errors.streetAddress ? (
            <Text style={styles.error}>{errors.streetAddress}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#9A8C7F"
            keyboardType="phone-pad"
            value={form.phoneNumber}
            onChangeText={value => handleChange('phoneNumber', value)}
          />
          {errors.phoneNumber ? (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9A8C7F"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => handleChange('email', value)}
          />
          {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.85}
            onPress={() => setIsRestaurantTypeOpen(prev => !prev)}>
            <Text
              style={
                form.restaurantType
                  ? styles.dropdownText
                  : styles.dropdownPlaceholder
              }>
              {form.restaurantType || 'Restaurant type'}
            </Text>
            <Text style={styles.dropdownIcon}>
              {isRestaurantTypeOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {errors.restaurantType ? (
            <Text style={styles.error}>{errors.restaurantType}</Text>
          ) : null}

          {isRestaurantTypeOpen ? (
            <View style={styles.dropdownList}>
              {RESTAURANT_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.dropdownItem}
                  activeOpacity={0.75}
                  onPress={() => handleRestaurantTypeSelect(type)}>
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.dropdownButton,
              !form.restaurantType && styles.disabledDropdown,
            ]}
            activeOpacity={0.85}
            disabled={!form.restaurantType}
            onPress={() => setIsCuisineTypeOpen(prev => !prev)}>
            <Text
              style={
                form.cuisineType ? styles.dropdownText : styles.dropdownPlaceholder
              }>
              {form.cuisineType || 'Cuisine type'}
            </Text>
            <Text style={styles.dropdownIcon}>
              {isCuisineTypeOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {errors.cuisineType ? (
            <Text style={styles.error}>{errors.cuisineType}</Text>
          ) : null}

          {isCuisineTypeOpen && form.restaurantType ? (
            <View style={styles.dropdownList}>
              {cuisineOptions.map(cuisine => (
                <TouchableOpacity
                  key={cuisine}
                  style={styles.dropdownItem}
                  activeOpacity={0.75}
                  onPress={() => handleCuisineTypeSelect(cuisine)}>
                  <Text style={styles.dropdownItemText}>{cuisine}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Max guests"
            placeholderTextColor="#9A8C7F"
            keyboardType="number-pad"
            value={form.maxGuests}
            onChangeText={value => handleChange('maxGuests', value)}
          />
          {errors.maxGuests ? (
            <Text style={styles.error}>{errors.maxGuests}</Text>
          ) : null}

          <Text style={styles.sectionLabel}>Working hours</Text>

          <Text style={styles.smallLabel}>Monday - Thursday</Text>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.timeButton}
              activeOpacity={0.85}
              onPress={() => openTimePicker('workingHoursWeekdaysFrom')}>
              <Text
                style={
                  form.workingHoursWeekdaysFrom
                    ? styles.timeText
                    : styles.timePlaceholder
                }>
                {form.workingHoursWeekdaysFrom || 'Open time'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeButton}
              activeOpacity={0.85}
              onPress={() => openTimePicker('workingHoursWeekdaysTo')}>
              <Text
                style={
                  form.workingHoursWeekdaysTo
                    ? styles.timeText
                    : styles.timePlaceholder
                }>
                {form.workingHoursWeekdaysTo || 'Close time'}
              </Text>
            </TouchableOpacity>
          </View>

          {errors.workingHoursWeekdaysFrom ? (
            <Text style={styles.error}>{errors.workingHoursWeekdaysFrom}</Text>
          ) : null}

          {errors.workingHoursWeekdaysTo ? (
            <Text style={styles.error}>{errors.workingHoursWeekdaysTo}</Text>
          ) : null}

          <Text style={styles.smallLabel}>Friday - Sunday</Text>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.timeButton}
              activeOpacity={0.85}
              onPress={() => openTimePicker('workingHoursWeekendFrom')}>
              <Text
                style={
                  form.workingHoursWeekendFrom
                    ? styles.timeText
                    : styles.timePlaceholder
                }>
                {form.workingHoursWeekendFrom || 'Open time'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeButton}
              activeOpacity={0.85}
              onPress={() => openTimePicker('workingHoursWeekendTo')}>
              <Text
                style={
                  form.workingHoursWeekendTo
                    ? styles.timeText
                    : styles.timePlaceholder
                }>
                {form.workingHoursWeekendTo || 'Close time'}
              </Text>
            </TouchableOpacity>
          </View>

          {errors.workingHoursWeekendFrom ? (
            <Text style={styles.error}>{errors.workingHoursWeekendFrom}</Text>
          ) : null}

          {errors.workingHoursWeekendTo ? (
            <Text style={styles.error}>{errors.workingHoursWeekendTo}</Text>
          ) : null}

          {isTimePickerVisible ? (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour
              display="default"
              onChange={handleTimeChange}
            />
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Business registration number"
            placeholderTextColor="#9A8C7F"
            value={form.businessRegistrationNumber}
            onChangeText={value =>
              handleChange('businessRegistrationNumber', value)
            }
          />
          {errors.businessRegistrationNumber ? (
            <Text style={styles.error}>{errors.businessRegistrationNumber}</Text>
          ) : null}

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (optional)"
            placeholderTextColor="#9A8C7F"
            multiline
            value={form.description}
            onChangeText={value => handleChange('description', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9A8C7F"
            secureTextEntry
            value={form.password}
            onChangeText={value => handleChange('password', value)}
          />
          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#9A8C7F"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
          />
          {errors.confirmPassword ? (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleRegister}>
            <Text style={styles.buttonText}>Submit Registration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RestaurantRegisterScreen;