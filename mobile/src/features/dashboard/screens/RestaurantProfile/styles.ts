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
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 20,
  },

  progressCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },

  progressTitle: {
    color: '#F3E7EA',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },

  progressValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
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
    minHeight: 120,
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

  featuresTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 10,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE5DA',
  },

  switchLabel: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  backText: {
  fontSize: 15,
  color: '#8B1E3F',
  fontWeight: '800',
  marginBottom: 14,
},
});