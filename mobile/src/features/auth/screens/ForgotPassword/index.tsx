import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useForgotPassword } from './logic';
import { styles } from './styles';

function ForgotPassword(): React.JSX.Element {
  const {
    email,
    setEmail,
    isSubmitting,
    handleSendCode,
    handleGoBack,
  } = useForgotPassword();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Enter your email address and we will generate a verification code.
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          placeholderTextColor="#8B8178"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          disabled={isSubmitting}
          onPress={handleSendCode}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Sending...' : 'Send Code'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;