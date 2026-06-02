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
    paddingBottom: 140,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2A211C',
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInitials: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  profileMenu: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  profileName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 10,
  },

  profileMenuItem: {
    paddingVertical: 10,
  },

  profileMenuText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
  },

  logoutText: {
    fontSize: 14,
    color: '#8B1E3F',
    fontWeight: '800',
  },

  searchInput: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#2A211C',
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginTop: 22,
  },

  filtersRow: {
    paddingVertical: 18,
  },

  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginRight: 10,
  },

  activeFilterChip: {
    backgroundColor: '#8B1E3F',
    borderColor: '#8B1E3F',
  },

  filterText: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '700',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2A211C',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '600',
  },

  cardsWrapper: {},

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginBottom: 16,
  },

  imagePlaceholder: {
    height: 128,
    backgroundColor: '#D7BFA6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageText: {
    color: '#2A211C',
    fontWeight: '800',
    fontSize: 16,
  },

  cardBody: {
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 4,
  },

  restaurantMeta: {
    fontSize: 13,
    color: '#6E6258',
  },

  rating: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2A211C',
  },

  foodType: {
    fontSize: 13,
    color: '#4B4038',
    marginTop: 12,
    fontWeight: '600',
  },

  cardFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    fontSize: 13,
    color: '#4B4038',
    fontWeight: '700',
  },

  viewButton: {
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },

  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  loadingBox: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 30,
},

loadingText: {
  marginTop: 10,
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '600',
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