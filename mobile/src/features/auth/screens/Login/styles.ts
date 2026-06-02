import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  content: {
    gap: 20,
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
    lineHeight: 22,
    color: '#6E6258',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    padding: 18,
    gap: 16,
  },

  form: {
    gap: 14,
  },

  input: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2A211C',
    borderWidth: 1,
    borderColor: '#D8CFC5',
  },

  loginButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  registerText: {
    textAlign: 'center',
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '700',
  },

  forgotPasswordText: {
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 2,
  },
});