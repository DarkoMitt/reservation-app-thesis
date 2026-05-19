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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 4,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
  },

  logoutButton: {
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  statusCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },

  statusLabel: {
    color: '#F3E7EA',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },

  statusValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#6E6258',
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

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 16,
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 10,
    fontWeight: '600',
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '500',
  },
  profileButton: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#8B1E3F',
  paddingVertical: 14,
  borderRadius: 16,
  alignItems: 'center',
  marginBottom: 20,
},

profileButtonText: {
  color: '#8B1E3F',
  fontSize: 14,
  fontWeight: '800',
},

backButton: {
  alignSelf: 'flex-start',
  paddingVertical: 8,
  paddingHorizontal: 4,
  marginBottom: 12,
},

backButtonText: {
  fontSize: 16,
  fontWeight: '800',
  color: '#8B1E3F',
},

headerText: {
  flex: 1,
  paddingRight: 12,
},

requestCard: {
  backgroundColor: '#FFF7EC',
  borderRadius: 18,
  padding: 16,
  marginBottom: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

requestHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},

requestName: {
  fontSize: 16,
  fontWeight: '800',
  color: '#2A211C',
},

requestRisk: {
  fontSize: 12,
  fontWeight: '700',
  color: '#8B1E3F',
},

requestText: {
  fontSize: 14,
  color: '#4B4038',
  marginBottom: 8,
  fontWeight: '600',
},

requestButtonsRow: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 14,
},

approveButton: {
  flex: 1,
  backgroundColor: '#1E7A46',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

approveButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

rejectButton: {
  flex: 1,
  backgroundColor: '#B3261E',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

rejectButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

rejectReasonBox: {
  marginTop: 14,
},

rejectReasonLabel: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '800',
  marginBottom: 8,
},

rejectReasonInput: {
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

cancelRejectButton: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#8B1E3F',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

cancelRejectButtonText: {
  color: '#8B1E3F',
  fontSize: 14,
  fontWeight: '800',
},

changeOfferBox: {
  marginTop: 14,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

changeOfferTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#8B1E3F',
  marginBottom: 12,
},

inputSmall: {
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

changeButton: {
  flex: 1,
  backgroundColor: '#D9902F',
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

changeButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

newCustomerBadge: {
  fontSize: 12,
  color: '#D9902F',
  fontWeight: '800',
  marginTop: 4,
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

rateCustomerBox: {
  marginTop: 14,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

rateCustomerTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#8B1E3F',
  marginBottom: 12,
},

alreadyRatedText: {
  fontSize: 13,
  color: '#1E7A46',
  fontWeight: '800',
  marginTop: 10,
},
});