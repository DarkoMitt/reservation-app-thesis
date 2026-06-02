import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useChooseRole } from './logic';
import { styles } from './styles';

function ChooseRoleScreen(): React.JSX.Element {
  const { handleCustomerPress, handleRestaurantPress, handleLoginPress } = useChooseRole();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Choose how you want to continue using the application.
          </Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleCustomerPress}>
            <Text style={styles.buttonText}>I am a Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={handleRestaurantPress}>
            <Text style={styles.buttonText}>I am a Restaurant</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handleLoginPress}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ChooseRoleScreen;