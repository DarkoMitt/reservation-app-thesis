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
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 14,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8B1E3F',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '600',
    marginBottom: 18,
  },

  summaryCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 18,
  },

  summaryNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  summaryLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F7EAF0',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '600',
  },

  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },

  customerName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 4,
  },

  customerEmail: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '600',
  },

  statusBadge: {
    backgroundColor: '#E7F5EA',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },

  statusBadgeText: {
    color: '#1E7A46',
    fontSize: 12,
    fontWeight: '900',
  },

  detailsBox: {
    backgroundColor: '#FFF7EC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  detailText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '700',
    marginBottom: 6,
  },

  rateButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1E3F',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },

  rateButtonText: {
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '900',
  },

  alreadyRatedText: {
    fontSize: 13,
    color: '#1E7A46',
    fontWeight: '900',
    marginTop: 2,
  },

  rateCustomerBox: {
    backgroundColor: '#FFF7EC',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  rateCustomerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B1E3F',
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '900',
    marginBottom: 8,
  },

  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },

  starText: {
    fontSize: 30,
    color: '#D8CFC5',
    fontWeight: '900',
  },

  activeStarText: {
    color: '#D99A2B',
  },

  reviewInput: {
    minHeight: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 12,
    fontSize: 14,
    color: '#2A211C',
    textAlignVertical: 'top',
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1E3F',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '900',
  },

  submitButton: {
    flex: 1,
    backgroundColor: '#8B1E3F',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  viewProfileButton: {
    marginTop: 12,
    backgroundColor: '#8B1E3F',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },

  viewProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});