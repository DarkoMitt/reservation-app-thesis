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
import { useCustomerRegister } from './logic';
import { styles } from './styles';

function CustomerRegisterScreen(): React.JSX.Element {
  const {
    form,
    errors,
    handleChange,
    handleRegister,
    FOOD_PREFERENCES,
    isPreferencesOpen,
    setIsPreferencesOpen,
    handlePreferenceSelect,
    COUNTRIES,
    CITIES_BY_COUNTRY,
    isCountryOpen,
    setIsCountryOpen,
    handleCountrySelect,
    isCityOpen,
    setIsCityOpen,
    handleCitySelect,

    isBirthDatePickerVisible,
    selectedBirthDate,
    openBirthDatePicker,
    handleBirthDateChange,
  } = useCustomerRegister();

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text style={styles.title}>Create Customer Account</Text>
        <Text style={styles.subtitle}>
          Register to discover restaurants and manage your reservations.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="#9A8C7F"
            value={form.firstName}
            onChangeText={value => handleChange('firstName', value)}
          />
          {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor="#9A8C7F"
            value={form.lastName}
            onChangeText={value => handleChange('lastName', value)}
          />
          {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.85}
            onPress={() => setIsCountryOpen(prev => !prev)}>
            <Text style={form.country ? styles.dropdownText : styles.dropdownPlaceholder}>
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
            style={[styles.dropdownButton, !form.country && styles.disabledDropdown]}
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
            placeholder="Phone number"
            placeholderTextColor="#9A8C7F"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={value => handleChange('phone', value)}
          />
          {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

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
            onPress={openBirthDatePicker}>
            <Text style={form.birthDate ? styles.dropdownText : styles.dropdownPlaceholder}>
              {form.birthDate || 'Birth date'}
            </Text>
            <Text style={styles.dropdownIcon}>📅</Text>
          </TouchableOpacity>
          {errors.birthDate ? <Text style={styles.error}>{errors.birthDate}</Text> : null}

          {isBirthDatePickerVisible ? (
            <DateTimePicker
              value={selectedBirthDate || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleBirthDateChange}
            />
          ) : null}

          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.85}
            onPress={() => setIsPreferencesOpen(prev => !prev)}>
            <Text style={form.preferences ? styles.dropdownText : styles.dropdownPlaceholder}>
              {form.preferences || 'Food preferences'}
            </Text>
            <Text style={styles.dropdownIcon}>{isPreferencesOpen ? '▲' : '▼'}</Text>
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

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9A8C7F"
            secureTextEntry
            value={form.password}
            onChangeText={value => handleChange('password', value)}
          />
          {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

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
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CustomerRegisterScreen;