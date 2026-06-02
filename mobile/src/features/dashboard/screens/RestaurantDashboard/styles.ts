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
    paddingTop: 40,
    paddingBottom: 148,
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
    fontWeight: '800',
    color: '#8B1E3F',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  greeting: {
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 4,
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
  },

  avatarButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  profileMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E7DED3',
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
    backgroundColor: '#8B1E3F',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  statusLabel: {
    color: '#F3E7EA',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '700',
  },

  statusValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
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
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 16,
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
    marginBottom: 10,
    fontWeight: '600',
  },

  requestCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 20,
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
    fontSize: 17,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 4,
  },

  requestRisk: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8B1E3F',
  },

  requestText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 8,
    fontWeight: '600',
  },

  newCustomerBadge: {
    fontSize: 12,
    color: '#D9902F',
    fontWeight: '900',
    marginTop: 4,
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
    fontWeight: '900',
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
    fontWeight: '900',
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
    fontWeight: '900',
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
    fontWeight: '900',
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
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },

  viewProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  headerRight: {
  flexDirection: 'row',
  alignItems: 'center',
},

notificationButton: {
  width: 46,
  height: 46,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderWidth: 1,
  borderColor: '#D8CFC5',
  borderRadius: 14,
  backgroundColor: '#FFFFFF',
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
  fontWeight: '800',
},

pickerInputText: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '700',
},

bottomNavContainer: {
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 12,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#D8CFC5',
  borderRadius: 24,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 8,
},

bottomNavItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 8,
  borderRadius: 16,
},

bottomNavItemActive: {
  backgroundColor: '#F3E7EA',
},

bottomNavIcon: {
  fontSize: 14,
  color: '#6E6258',
  marginBottom: 2,
  fontWeight: '700',
},

bottomNavText: {
  fontSize: 11,
  color: '#6E6258',
  fontWeight: '700',
},

bottomNavTextActive: {
  color: '#8B1E3F',
},
});