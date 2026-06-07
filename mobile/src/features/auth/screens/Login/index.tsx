import React from 'react';
import {
  ImageBackground,
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
      <ImageBackground
        source={require('../../../../assets/images/login-background.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>
              Login to continue managing your reservations.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>✉</Text>

              <TextInput
                placeholder="Email or Phone Number"
                placeholderTextColor="#8B8178"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>🔒</Text>

              <TextInput
                placeholder="Password"
                placeholderTextColor="#8B8178"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

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
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Text style={styles.registerHint}>
              Don’t have an account?
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoToRegister}>
              <Text style={styles.registerText}>
                Create Account →
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default LoginScreen;