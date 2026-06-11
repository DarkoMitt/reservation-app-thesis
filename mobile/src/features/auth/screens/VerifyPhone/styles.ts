import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    gap: 16,
  },
  backText: {
    fontSize: 16,
    color: '#8B1E3F',
    fontWeight: '600',
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2A211C',
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6258',
    lineHeight: 22,
  },
  phoneText: {
    fontSize: 16,
    color: '#8B1E3F',
    fontWeight: '700',
  },
  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    padding: 16,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  codeInput: {
    width: 45,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    backgroundColor: '#FFFDFC',
    fontSize: 21,
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
    fontSize: 14,
    color: '#8B1E3F',
    fontWeight: '700',
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#8B1E3F',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});