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
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6E6258',
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: '#7B1E2B',
    paddingVertical: 18,
    borderRadius: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#A52A3B',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF8F2',
    fontSize: 17,
    fontWeight: '700',
  },
});