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

import { useVerifyPhone } from './logic';
import { styles } from './styles';

function VerifyPhoneScreen(): React.JSX.Element {
  const {
    phone,
    codeDigits,
    inputRefs,
    secondsLeft,
    formattedCountdown,
    isVerifying,
    isResending,
    handleCodeChange,
    handleCodeKeyPress,
    handleResendCode,
    handleVerifyPhone,
    handleGoBack,
  } = useVerifyPhone();

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
            <Text style={styles.title}>Verify Phone</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code generated for:
            </Text>
            <Text style={styles.phoneText}>{phone}</Text>
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

            <Text
              style={[
                styles.timerText,
                secondsLeft <= 10 && styles.timerDangerText,
              ]}>
              Code expires in {formattedCountdown}
            </Text>

            <TouchableOpacity
              disabled={isResending}
              onPress={handleResendCode}>
              <Text style={styles.resendText}>
                {isResending ? 'Generating new code...' : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            disabled={isVerifying}
            onPress={handleVerifyPhone}>
            <Text style={styles.verifyButtonText}>
              {isVerifying ? 'Verifying...' : 'Verify Phone'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default VerifyPhoneScreen;