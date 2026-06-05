import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(42, 33, 28, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',

    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F3E7EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2A211C',
    textAlign: 'center',
    marginBottom: 8,
  },

  message: {
    fontSize: 15,
    lineHeight: 23,
    color: '#6E6258',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 22,
  },

  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },

  button: {
    flex: 1,
    minHeight: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  primaryButton: {
    backgroundColor: '#8B1E3F',
  },

  cancelButton: {
    backgroundColor: '#F7F1E8',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  destructiveButton: {
    backgroundColor: '#B3261E',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '900',
  },

  primaryButtonText: {
    color: '#FFFFFF',
  },

  cancelButtonText: {
    color: '#6E6258',
  },

  destructiveButtonText: {
    color: '#FFFFFF',
  },
});