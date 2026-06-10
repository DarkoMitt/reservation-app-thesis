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
    paddingTop: 34,
    paddingBottom: 150,
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
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  greeting: {
    fontSize: 13,
    color: '#8B8178',
    marginBottom: 4,
    fontWeight: '800',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    letterSpacing: -0.8,
  },

  avatarButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
    shadowColor: '#2A211C',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  avatarText: {
    color: '#8B1E3F',
    fontSize: 20,
    fontWeight: '900',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E7DED3',
    shadowColor: '#2A211C',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  profileMenuName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 14,
  },

  profileMenuItem: {
    paddingVertical: 12,
  },

  profileMenuText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4B4038',
  },

  profileMenuLogout: {
    fontSize: 15,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  statusCard: {
    backgroundColor: '#9F1D4C',
    borderRadius: 26,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#8B1E3F',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  statusLabel: {
    color: '#F8DDE7',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '800',
  },

  statusValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    textTransform: 'capitalize',
    letterSpacing: -0.8,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },

  maxGuestsCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 26,
  padding: 22,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#E7DED3',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 18,
},

maxGuestsIconBox: {
  width: 58,
  height: 58,
  borderRadius: 22,
  backgroundColor: '#F8F2EA',
  justifyContent: 'center',
  alignItems: 'center',
},

maxGuestsIcon: {
  fontSize: 28,
},

maxGuestsValue: {
  fontSize: 38,
  fontWeight: '900',
  color: '#2A211C',
},

maxGuestsLabel: {
  fontSize: 14,
  fontWeight: '800',
  color: '#6E6258',
},

smallStatsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
  marginBottom: 20,
},

  statCard: {
  width: '48%',
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  paddingVertical: 16,
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

  statValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
    letterSpacing: -0.6,
  },

  statLabel: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '800',
    lineHeight: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
    shadowColor: '#2A211C',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '600',
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 10,
    fontWeight: '700',
  },

  requestCard: {
    backgroundColor: '#FFF8EF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  requestName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 4,
  },

  requestRisk: {
    fontSize: 12,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  requestText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 8,
    fontWeight: '700',
  },

  newCustomerBadge: {
    fontSize: 12,
    color: '#D9902F',
    fontWeight: '900',
    marginTop: 4,
  },

  requestButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  approveButton: {
    flex: 1,
    backgroundColor: '#1E7A46',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#B3261E',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  rejectButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  changeButton: {
    flex: 1,
    backgroundColor: '#D9902F',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  profileButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1E3F',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 14,
  },

  profileButtonText: {
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '900',
  },

  rejectReasonBox: {
    marginTop: 14,
  },

  rejectReasonLabel: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '900',
    marginBottom: 8,
  },

  rejectReasonInput: {
    minHeight: 90,
    borderRadius: 16,
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
    fontWeight: '900',
  },

  changeOfferBox: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  changeOfferTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B1E3F',
    marginBottom: 12,
  },

  inputSmall: {
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2A211C',
    marginBottom: 10,
  },

  pickerInputText: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '800',
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

  alreadyRatedText: {
    fontSize: 13,
    color: '#1E7A46',
    fontWeight: '900',
    marginTop: 10,
  },

  viewProfileButton: {
    marginTop: 12,
    backgroundColor: '#8B1E3F',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },

  viewProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  notificationButton: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E7DED3',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#2A211C',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  notificationIconWrap: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  notificationBellBody: {
    width: 14,
    height: 12,
    borderWidth: 1.8,
    borderColor: '#6E6258',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomWidth: 1.2,
  },

  notificationBellClapper: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6E6258',
    marginTop: 1,
  },

  notificationBadge: {
    position: 'absolute',
    top: 3,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D62839',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  bottomNavContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8CFC5',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#2A211C',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 18,
  },

  bottomNavItemActive: {
    backgroundColor: '#F3E7EA',
  },

  bottomNavIcon: {
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 2,
    fontWeight: '800',
  },

  bottomNavText: {
    fontSize: 11,
    color: '#6E6258',
    fontWeight: '800',
  },

  bottomNavTextActive: {
    color: '#8B1E3F',
  },

  summaryItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF8EF',
  borderRadius: 20,
  padding: 14,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

summaryItemActive: {
  borderColor: '#8B1E3F',
  backgroundColor: '#FBEAF0',
},

summaryIconBox: {
  width: 44,
  height: 44,
  borderRadius: 16,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

summaryIcon: {
  fontSize: 20,
},

summaryTextBox: {
  flex: 1,
},

summaryTitle: {
  fontSize: 15,
  fontWeight: '900',
  color: '#2A211C',
  marginBottom: 4,
},

summaryDescription: {
  fontSize: 13,
  fontWeight: '600',
  color: '#6E6258',
  lineHeight: 18,
},

summaryRightBox: {
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
},

summaryCount: {
  fontSize: 14,
  fontWeight: '900',
  color: '#8B1E3F',
  marginBottom: 2,
},

summaryArrow: {
  fontSize: 26,
  fontWeight: '900',
  color: '#8B1E3F',
},

statIconContainer: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#F8F2EA',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
},

statIcon: {
  fontSize: 20,
},
});