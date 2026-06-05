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
    paddingBottom: 145,
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
    fontWeight: '900',
    color: '#8B1E3F',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#6E6258',
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 18,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
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

  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },

  customerInfo: {
    flex: 1,
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
    fontWeight: '700',
  },

  ratingBadge: {
    backgroundColor: '#8B1E3F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  ratingsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  ratingBox: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  ratingLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6E6258',
    marginBottom: 4,
  },

  ratingValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  priceText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '800',
    marginBottom: 12,
  },

  commentBox: {
    backgroundColor: '#FFF7EC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginBottom: 14,
  },

  commentTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#8B1E3F',
    marginBottom: 6,
  },

  commentText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4B4038',
    fontWeight: '600',
  },

  viewProfileButton: {
    backgroundColor: '#8B1E3F',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  viewProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  dateText: {
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '700',
  },

  summaryCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 24,
  padding: 18,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

summaryTitle: {
  fontSize: 18,
  fontWeight: '900',
  color: '#2A211C',
  marginBottom: 12,
},

summaryMainRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},

summaryStar: {
  fontSize: 34,
  color: '#D99A2B',
  fontWeight: '900',
  marginRight: 8,
},

summaryRating: {
  fontSize: 30,
  fontWeight: '900',
  color: '#D99A2B',
},

summaryText: {
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '700',
  marginBottom: 6,
},

summaryDetailsBox: {
  backgroundColor: '#F7F1E8',
  borderRadius: 18,
  padding: 14,
  marginTop: 12,
},

summaryDetailText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '800',
  marginBottom: 6,
},
});