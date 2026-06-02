import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  backText: {
    fontSize: 16,
    color: '#8B1E3F',
    marginBottom: 20,
    fontWeight: '600',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#6E6258',
    lineHeight: 22,
  },

  emailText: {
    fontSize: 15,
    color: '#8B1E3F',
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 28,
  },

  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  codeInput: {
    width: 46,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    backgroundColor: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    color: '#2A211C',
  },

  activeCodeInput: {
    borderColor: '#8B1E3F',
    backgroundColor: '#FFF7FA',
  },

  timerText: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  timerDangerText: {
    color: '#C62828',
  },

  resendText: {
    fontSize: 15,
    color: '#8B1E3F',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 28,
  },

  passwordBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginBottom: 22,
  },

  passwordLabel: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '800',
    marginBottom: 8,
  },

  passwordInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    borderRadius: 14,
    backgroundColor: '#FDFBF8',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#2A211C',
    marginBottom: 16,
  },

  resetButton: {
    backgroundColor: '#8B1E3F',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});