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
  borderRadius: 24,
  padding: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

closedStatus: {
  color: '#6E6258',
},

closedStatusText: {
  color: '#6E6258',
},

name: {
  fontSize: 30,
  fontWeight: '900',
  color: '#2A211C',
  marginBottom: 6,
},

meta: {
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '700',
  marginBottom: 8,
},

foodType: {
  fontSize: 14,
  color: '#8B1E3F',
  fontWeight: '900',
  marginBottom: 12,
},

ratingRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  marginTop: 8,
},

rating: {
  fontSize: 13,
  color: '#6E6258',
  fontWeight: '700',
  flex: 1,
},

status: {
  fontSize: 14,
  color: '#2F7D32',
  fontWeight: '900',
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
  paddingVertical: 17,
  borderRadius: 18,
  alignItems: 'center',
  marginBottom: 18,
},

reserveButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '900',
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
  borderRadius: 24,
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

heroImageWrapper: {
  width: 350,
  height: 210,
  borderRadius: 28,
  overflow: 'hidden',
  marginRight: 12,
  backgroundColor: '#EFE5DA',
  position: 'relative',
},

heroImageReal: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

heroImageCounter: {
  position: 'absolute',
  right: 14,
  bottom: 14,
  backgroundColor: 'rgba(42, 33, 28, 0.72)',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 999,
},

heroImageCounterText: {
  color: '#FFFFFF',
  fontSize: 13,
  fontWeight: '900',
},

heroStatusBadge: {
  position: 'absolute',
  left: 14,
  bottom: 14,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 999,
},

heroStatusText: {
  color: '#2F7D32',
  fontSize: 13,
  fontWeight: '900',
},

headerTopRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
},

headerMainInfo: {
  flex: 1,
},

ratingPill: {
  backgroundColor: '#8B1E3F',
  borderRadius: 18,
  paddingHorizontal: 14,
  paddingVertical: 10,
},

ratingPillText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '900',
},

infoGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
  marginBottom: 18,
},

infoGridCard: {
  width: '48%',
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

infoIconBox: {
  width: 42,
  height: 42,
  borderRadius: 16,
  backgroundColor: '#F8F2EA',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},

infoIcon: {
  fontSize: 20,
},

infoGridTitle: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '900',
  marginBottom: 6,
},

infoGridText: {
  fontSize: 13,
  color: '#4B4038',
  fontWeight: '700',
  lineHeight: 18,
},

ratingSummaryContent: {
  flexDirection: 'row',
  gap: 14,
  marginBottom: 10,
},

ratingLeftBox: {
  flex: 1,
  justifyContent: 'center',
},

ratingBarsBox: {
  flex: 1.15,
  backgroundColor: '#F8F2EA',
  borderRadius: 18,
  padding: 10,
},

ratingBarRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
},

ratingBarLabel: {
  width: 30,
  fontSize: 12,
  color: '#4B4038',
  fontWeight: '800',
},

ratingBarTrack: {
  flex: 1,
  height: 8,
  backgroundColor: '#E7DED3',
  borderRadius: 999,
  overflow: 'hidden',
  marginHorizontal: 6,
},

ratingBarFill: {
  width: '0%',
  height: '100%',
  backgroundColor: '#D99A2B',
  borderRadius: 999,
},

ratingBarPercent: {
  width: 28,
  fontSize: 12,
  color: '#4B4038',
  fontWeight: '800',
  textAlign: 'right',
},

ratingMainRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 14,
},

ratingReviewsBadge: {
  backgroundColor: '#F3E7EA',
  borderRadius: 999,
  paddingHorizontal: 12,
  paddingVertical: 7,
},

ratingReviewsBadgeText: {
  color: '#8B1E3F',
  fontSize: 12,
  fontWeight: '900',
},

ratingCategoryGrid: {
  flexDirection: 'row',
  gap: 10,
  marginBottom: 14,
},

ratingCategoryBox: {
  flex: 1,
  backgroundColor: '#F8F2EA',
  borderRadius: 18,
  paddingVertical: 14,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E7DED3',
},

ratingCategoryIcon: {
  fontSize: 22,
  marginBottom: 6,
},

ratingCategoryValue: {
  fontSize: 18,
  fontWeight: '900',
  color: '#8B1E3F',
},

ratingCategoryLabel: {
  fontSize: 11,
  fontWeight: '800',
  color: '#6E6258',
  marginTop: 4,
},

heroContainer: {
  position: 'relative',
  marginBottom: 18,
},

heroGallery: {
  marginBottom: 0,
},

heroStatusBadgeFixed: {
  position: 'absolute',
  left: 14,
  top: 14,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 999,
  zIndex: 999,
  elevation: 10,
},

headerActions: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

favoriteButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  borderWidth: 1,
  borderColor: '#D8CFC5',
  backgroundColor: '#FFFDFC',
  alignItems: 'center',
  justifyContent: 'center',
},

favoriteButtonActive: {
  backgroundColor: '#FFF0F3',
  borderColor: '#8B1E3F',
},

favoriteButtonText: {
  fontSize: 26,
  color: '#8B1E3F',
  fontWeight: '800',
  marginTop: -2,
},

favoriteButtonTextActive: {
  color: '#8B1E3F',
},
});