import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useChooseRole } from './logic';
import { styles } from './styles';

function ChooseRoleScreen(): React.JSX.Element {
  const { handleCustomerPress, handleRestaurantPress, handleLoginPress } =
    useChooseRole();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={styles.brandBadge}>
          <Image
            source={require('../../../../assets/images/reserved-logo.png')}
            style={styles.brandLogo}
          />
        </View>

        <Text style={styles.appName}>DineSpot</Text>

        <Text style={styles.tagline}>
          Find your table. Reserve your moment.
        </Text>

        <Text style={styles.subtitle}>
          Choose your role and continue with the experience made for you.
        </Text>

        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.88}
          onPress={handleCustomerPress}>

          <Image
            source={require('../../../../assets/images/customer-register.png')}
            style={styles.roleImage}
          />

          <View style={styles.roleContent}>
            <Text style={styles.restaurantRoleTitle}>I am a Customer</Text>
            <Text style={styles.roleTextDark}>Discover restaurants</Text>
            <Text style={styles.roleTextDark}>Reserve tables</Text>
            <Text style={styles.roleTextDark}>Rate experiences</Text>
          </View>

          <Text style={styles.arrowDark}>›</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.88}
          onPress={handleRestaurantPress}>

          <Image
            source={require('../../../../assets/images/restaurant-register.png')}
            style={styles.roleImage}
          />

          <View style={styles.roleContent}>
            <Text style={styles.restaurantRoleTitle}>I am a Restaurant</Text>
            <Text style={styles.roleTextDark}>Manage bookings</Text>
            <Text style={styles.roleTextDark}>Accept requests</Text>
            <Text style={styles.roleTextDark}>Grow your business</Text>
          </View>

          <Text style={styles.arrowDark}>›</Text>
        </TouchableOpacity>
          <Text style={styles.loginHint}>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLoginPress}>
          <Text style={styles.loginText}>Log In →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ChooseRoleScreen;