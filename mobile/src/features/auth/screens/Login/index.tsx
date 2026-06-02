import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLogin } from './logic';
import { styles } from './styles';

function LoginScreen(): React.JSX.Element {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleGoToRegister,
    handleForgotPassword,
  } = useLogin();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to continue using Reservation App.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.form}>
              <TextInput
                placeholder="Email or Phone Number"
                placeholderTextColor="#8B8178"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#8B8178"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.85}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoToRegister}>
              <Text style={styles.registerText}>
                Don’t have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;