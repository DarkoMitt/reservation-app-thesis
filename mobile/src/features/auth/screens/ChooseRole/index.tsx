import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useChooseRole } from './logic';
import { styles } from './styles';

function ChooseRoleScreen(): React.JSX.Element {
  const { handleCustomerPress, handleRestaurantPress } = useChooseRole();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>
          Choose how you want to continue using the application.
        </Text>

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
    </View>
  );
}

export default ChooseRoleScreen;