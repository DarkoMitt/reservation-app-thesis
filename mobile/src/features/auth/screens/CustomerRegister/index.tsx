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

          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#9A8C7F"
            value={form.city}
            onChangeText={value => handleChange('city', value)}
          />
          {errors.city ? <Text style={styles.error}>{errors.city}</Text> : null}

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

          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#9A8C7F"
            keyboardType="number-pad"
            value={form.age}
            onChangeText={value => handleChange('age', value)}
          />
          {errors.age ? <Text style={styles.error}>{errors.age}</Text> : null}

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