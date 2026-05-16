import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 40,
  },

  backText: {
    fontSize: 16,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 20,
  },

  restaurantCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },

  restaurantLabel: {
    color: '#F3E7EA',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },

  restaurantName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },

  restaurantMeta: {
    color: '#F3E7EA',
    fontSize: 14,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A211C',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2A211C',
  },

  textArea: {
    minHeight: 110,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 14,
    fontSize: 14,
    color: '#2A211C',
    textAlignVertical: 'top',
  },

  infoBox: {
    backgroundColor: '#FFF7EC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  infoText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6E6258',
    fontWeight: '600',
  },

  submitButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  pickerButton: {
  height: 52,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 14,
  justifyContent: 'center',
},

pickerValue: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '600',
},

pickerPlaceholder: {
  fontSize: 14,
  color: '#8B8178',
  fontWeight: '500',
},

availabilityBox: {
  backgroundColor: '#FFF7EC',
  borderRadius: 16,
  padding: 14,
  marginTop: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
  },

  availabilityText: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '700',
    marginBottom: 4,
  },

  availabilityValue: {
    fontSize: 26,
    color: '#8B1E3F',
    fontWeight: '800',
  },
});