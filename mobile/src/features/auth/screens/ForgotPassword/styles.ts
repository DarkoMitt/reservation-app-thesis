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

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    padding: 18,
    gap: 14,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D8CFC5',
    borderRadius: 14,
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2A211C',
  },

  button: {
    backgroundColor: '#8B1E3F',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});