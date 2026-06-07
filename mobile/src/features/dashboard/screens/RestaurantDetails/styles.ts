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

  heroImage: {
    height: 190,
    backgroundColor: '#8B1E3F',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  heroText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 6,
  },

  meta: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '600',
    marginBottom: 8,
  },

  foodType: {
    fontSize: 14,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 14,
  },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  rating: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '800',
  },

  status: {
    fontSize: 14,
    color: '#2F7D32',
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

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '500',
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 8,
  },

  secondaryInfoText: {
    fontSize: 13,
    color: '#8B8178',
    fontWeight: '500',
    marginTop: 6,
  },

  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  featureChip: {
    backgroundColor: '#F7F1E8',
    color: '#8B1E3F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    fontSize: 13,
    fontWeight: '800',
  },

  reserveButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 18,
  },

  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  reservationStatusCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  reservationStatusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8B1E3F',
    marginBottom: 12,
  },

  reservationInfoText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 8,
  },

  rejectedReservationCard: {
  backgroundColor: '#FFF0F0',
  borderRadius: 20,
  padding: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: '#F0C2C2',
},

rejectedReservationTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#B3261E',
  marginBottom: 12,
},

rejectionReasonText: {
  fontSize: 14,
  color: '#B3261E',
  fontWeight: '700',
  marginTop: 6,
},

changeRequestBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 14,
  marginTop: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

changeRequestTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#8B1E3F',
  marginBottom: 12,
},

changeReasonText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  marginTop: 6,
  marginBottom: 8,
},

expiryText: {
  fontSize: 12,
  color: '#8B8178',
  fontWeight: '600',
  marginTop: 4,
  marginBottom: 12,
},

changeButtonsRow: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 10,
},

acceptChangeButton: {
  flex: 1,
  backgroundColor: '#1E7A46',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

acceptChangeButtonText: {
  color: '#FFFFFF',
  fontSize: 13,
  fontWeight: '800',
},

rejectChangeButton: {
  flex: 1,
  backgroundColor: '#B3261E',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

rejectChangeButtonText: {
  color: '#FFFFFF',
  fontSize: 13,
  fontWeight: '800',
},

cancelBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 14,
  marginTop: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

cancelTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#B3261E',
  marginBottom: 8,
},

cancelHint: {
  fontSize: 12,
  color: '#6E6258',
  fontWeight: '600',
  lineHeight: 18,
  marginBottom: 10,
},

cancelInput: {
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

cancelReservationButton: {
  backgroundColor: '#B3261E',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 14,
},

cancelReservationButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

cancelSecondaryButton: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#8B1E3F',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

cancelSecondaryButtonText: {
  color: '#8B1E3F',
  fontSize: 14,
  fontWeight: '800',
},

ratingSummaryCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

ratingSummaryTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#2A211C',
  marginBottom: 8,
},

ratingSummaryMain: {
  fontSize: 30,
  fontWeight: '900',
  color: '#D99A2B',
  marginBottom: 6,
},

ratingSummarySub: {
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '600',
  marginBottom: 6,
},

ratingDetailsButton: {
  marginTop: 10,
  backgroundColor: '#8B1E3F',
  borderRadius: 14,
  paddingVertical: 12,
  alignItems: 'center',
},

ratingDetailsButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

ratingDetailsBox: {
  marginTop: 12,
  backgroundColor: '#F7F1E8',
  borderRadius: 16,
  padding: 14,
},

ratingDetailText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  marginBottom: 8,
},

galleryRow: {
  gap: 12,
  paddingRight: 4,
},

galleryImageWrapper: {
  width: 138,
  height: 110,
  borderRadius: 18,
  overflow: 'hidden',
  backgroundColor: '#EFE5DA',
  borderWidth: 1,
  borderColor: '#E7DED3',
},

menuImageWrapper: {
  width: 118,
  height: 150,
  borderRadius: 18,
  overflow: 'hidden',
  backgroundColor: '#EFE5DA',
  borderWidth: 1,
  borderColor: '#E7DED3',
},

galleryImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

imagePreviewOverlay: {
  flex: 1,
  backgroundColor: 'rgba(42, 33, 28, 0.92)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 18,
},

fullPreviewImage: {
  width: '100%',
  height: '72%',
  borderRadius: 22,
  resizeMode: 'contain',
},

imagePreviewCloseButton: {
  position: 'absolute',
  top: 48,
  right: 24,
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},

imagePreviewCloseText: {
  fontSize: 30,
  color: '#8B1E3F',
  fontWeight: '900',
  lineHeight: 32,
},
});