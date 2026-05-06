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
    gap: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2A211C',
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    marginBottom: 12,
  },

  form: {
    gap: 16,
  },

  input: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2A211C',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  loginButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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
    fontWeight: '600',
    marginTop: 8,
  },
});