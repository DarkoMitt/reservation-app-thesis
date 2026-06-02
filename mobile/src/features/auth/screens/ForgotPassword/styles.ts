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
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#6E6258',
    lineHeight: 22,
    marginBottom: 30,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2A211C',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#8B1E3F',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});