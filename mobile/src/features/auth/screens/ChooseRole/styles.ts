import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    gap: 18,
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
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#8B1E3F',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#B24B66',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginText: {
    textAlign: 'center',
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '700',
  },
});