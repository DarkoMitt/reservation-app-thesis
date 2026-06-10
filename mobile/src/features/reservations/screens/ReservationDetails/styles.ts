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
    paddingTop: 48,
    paddingBottom: 52,
  },

  backText: {
    fontSize: 16,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 20,
  },

  title: {
  fontSize: 31,
  fontWeight: '900',
  color: '#2A211C',
  marginBottom: 20,
  letterSpacing: -0.8,
},

card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 26,
  padding: 18,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#E7DED3',
  shadowColor: '#2A211C',
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
},

restaurantName: {
  fontSize: 22,
  color: '#2A211C',
  fontWeight: '900',
  marginBottom: 6,
},

restaurantMeta: {
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '700',
  marginBottom: 12,
},

  sectionTitle: {
  fontSize: 19,
  color: '#2A211C',
  fontWeight: '900',
},

statusBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#8B1E3F',
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '900',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 12,
  textTransform: 'capitalize',
},

  infoText: {
    fontSize: 15,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 10,
  },

  rejectedCard: {
    backgroundColor: '#FFECEC',
    borderWidth: 1,
    borderColor: '#F3B7B7',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  rejectedTitle: {
    fontSize: 18,
    color: '#B3261E',
    fontWeight: '800',
    marginBottom: 10,
  },

  rejectedReason: {
    fontSize: 14,
    color: '#7A1C15',
    fontWeight: '600',
    lineHeight: 22,
  },

  changeCard: {
    backgroundColor: '#FFF7EC',
    borderWidth: 1,
    borderColor: '#E7DED3',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  changeTitle: {
    fontSize: 18,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 12,
  },

  changeReason: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 14,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#1E824C',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#C62828',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  viewRestaurantButton: {
  backgroundColor: '#8B1E3F',
  borderRadius: 18,
  paddingVertical: 17,
  alignItems: 'center',
  marginBottom: 14,
  shadowColor: '#8B1E3F',
  shadowOpacity: 0.18,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
},

changeReservationButton: {
  backgroundColor: '#D99A2B',
  paddingVertical: 16,
  borderRadius: 18,
  alignItems: 'center',
  marginTop: 12,
  marginBottom: 18,
},

changeReservationButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '800',
},

changeRequestCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

changeRequestTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#2A211C',
  marginBottom: 14,
},

changeInput: {
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 14,
  paddingHorizontal: 14,
  paddingVertical: 12,
  marginBottom: 12,
  fontSize: 14,
  color: '#2A211C',
},

changeReasonInput: {
  minHeight: 100,
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 14,
  paddingHorizontal: 14,
  paddingVertical: 12,
  marginBottom: 12,
  fontSize: 14,
  color: '#2A211C',
  textAlignVertical: 'top',
},

changeInputText: {
  color: '#2A211C',
  fontSize: 14,
  fontWeight: '700',
},

viewRestaurantButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '900',
},

  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C62828',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#C62828',
    fontSize: 15,
    fontWeight: '800',
  },

  pastStatusBadge: {
  backgroundColor: '#6E6258',
},

pastLabel: {
  fontSize: 12,
  color: '#8B8178',
  fontWeight: '800',
  textTransform: 'uppercase',
  marginBottom: 12,
},

upcomingLabel: {
  fontSize: 12,
  color: '#8B1E3F',
  fontWeight: '800',
  textTransform: 'uppercase',
  marginBottom: 12,
},

ratingCard: {
  backgroundColor: '#FFF7EC',
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 22,
  padding: 18,
  marginBottom: 16,
},

ratingInfoText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  marginBottom: 10,
},

ratingHintText: {
  fontSize: 13,
  color: '#6E6258',
  fontWeight: '600',
  lineHeight: 20,
},

ratingForm: {
  marginTop: 8,
},

ratingInput: {
  height: 48,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#2A211C',
  marginBottom: 10,
},

ratingTextArea: {
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
  marginBottom: 12,
},

submitRatingButton: {
  backgroundColor: '#8B1E3F',
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: 'center',
},

submitRatingButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

ratingLabel: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '800',
  marginTop: 10,
  marginBottom: 6,
},

starsRow: {
  flexDirection: 'row',
  gap: 8,
  marginBottom: 8,
},

starText: {
  fontSize: 30,
  color: '#D8CFC5',
  fontWeight: '900',
},

activeStarText: {
  color: '#D99A2B',
},

priceOptionsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginBottom: 12,
},

priceOptionChip: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 14,
  paddingHorizontal: 12,
  paddingVertical: 10,
},

activePriceOptionChip: {
  backgroundColor: '#8B1E3F',
  borderColor: '#8B1E3F',
},

priceOptionText: {
  color: '#6E6258',
  fontSize: 13,
  fontWeight: '800',
},

activePriceOptionText: {
  color: '#FFFFFF',
},

waitlistInfoBox: {
  backgroundColor: '#FFF7E6',
  borderRadius: 18,
  padding: 14,
  marginTop: 12,
  borderWidth: 1,
  borderColor: '#F0C36D',
},

waitlistTitle: {
  fontSize: 15,
  fontWeight: '900',
  color: '#8B5E00',
  marginBottom: 6,
},

waitlistText: {
  fontSize: 13,
  lineHeight: 20,
  color: '#5A4630',
  fontWeight: '600',
  marginBottom: 4,
},

restaurantHeroCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 26,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#E7DED3',
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#2A211C',
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
},

restaurantIconBox: {
  width: 78,
  height: 78,
  borderRadius: 22,
  backgroundColor: '#F8F2EA',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 14,
},

restaurantIcon: {
  fontSize: 34,
},

restaurantHeroInfo: {
  flex: 1,
},

sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 14,
},

sectionIcon: {
  fontSize: 20,
  marginRight: 8,
},

infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#F0E7DD',
},

infoIconBox: {
  width: 38,
  height: 38,
  borderRadius: 14,
  backgroundColor: '#F8F2EA',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

infoIcon: {
  fontSize: 18,
},

infoTextBox: {
  flex: 1,
},

infoLabel: {
  fontSize: 13,
  color: '#8B8178',
  fontWeight: '800',
  marginBottom: 3,
},

infoValue: {
  fontSize: 15,
  color: '#2A211C',
  fontWeight: '900',
},

noticeCardDanger: {
  backgroundColor: '#FFECEC',
  borderWidth: 1,
  borderColor: '#F3B7B7',
  borderRadius: 24,
  padding: 18,
  marginBottom: 16,
},

noticeTitleDanger: {
  fontSize: 18,
  color: '#B3261E',
  fontWeight: '900',
  marginBottom: 10,
},

noticeTextDanger: {
  fontSize: 14,
  color: '#7A1C15',
  fontWeight: '700',
  lineHeight: 22,
},

noticeCardNeutral: {
  backgroundColor: '#F8F2EA',
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 24,
  padding: 18,
  marginBottom: 16,
},

noticeTitleNeutral: {
  fontSize: 18,
  color: '#6E6258',
  fontWeight: '900',
  marginBottom: 10,
},

noticeTextNeutral: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  lineHeight: 22,
},

divider: {
  height: 1,
  backgroundColor: '#E7DED3',
  marginVertical: 14,
},
});