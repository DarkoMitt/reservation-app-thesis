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

import { useResetPassword } from './logic';
import { styles } from './styles';

function ResetPassword(): React.JSX.Element {
  const {
    email,
    codeDigits,
    inputRefs,
    secondsLeft,
    formattedCountdown,

    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,

    isResetting,
    isResending,

    handleCodeChange,
    handleCodeKeyPress,
    handleResendCode,
    handleResetPassword,
    handleGoBack,
  } = useResetPassword();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code generated for:
            </Text>
            <Text style={styles.emailText}>{email}</Text>
          </View>

          <View style={styles.codeCard}>
            <View style={styles.codeRow}>
              {codeDigits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    digit ? styles.activeCodeInput : null,
                  ]}
                  value={digit}
                  onChangeText={value => handleCodeChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleCodeKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            <Text style={[
              styles.timerText,
              secondsLeft <= 10 && styles.timerDangerText,
            ]}>
              Code expires in {formattedCountdown}
            </Text>

            <TouchableOpacity
              disabled={isResending}
              onPress={handleResendCode}>
              <Text style={styles.resendText}>
                {isResending ? 'Resending...' : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordBox}>
            <Text style={styles.passwordLabel}>New Password</Text>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#8B8178"
              secureTextEntry
            />

            <Text style={styles.passwordLabel}>Confirm Password</Text>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#8B8178"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            disabled={isResetting}
            onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>
              {isResetting ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ResetPassword;