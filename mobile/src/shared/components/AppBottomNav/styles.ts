import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8CFC5',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
  },

  activeItem: {
    backgroundColor: '#F3E7EA',
  },

  icon: {
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 2,
    fontWeight: '800',
  },

  label: {
    fontSize: 10,
    color: '#6E6258',
    fontWeight: '800',
  },

  activeText: {
    color: '#8B1E3F',
  },
});