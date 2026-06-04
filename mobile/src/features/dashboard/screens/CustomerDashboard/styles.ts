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
    paddingBottom: 145,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitleBox: {
    flex: 1,
    paddingRight: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2A211C',
    lineHeight: 30,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E7DED3',
    borderRadius: 16,
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
    fontWeight: '900',
  },

  searchInput: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#2A211C',
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginTop: 22,
    fontWeight: '600',
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
    fontWeight: '800',
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
    fontSize: 20,
    fontWeight: '900',
    color: '#2A211C',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '700',
  },

  cardsWrapper: {},

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  typeIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F4E2D7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  typeIcon: {
    fontSize: 30,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  statusBadgeOpen: {
    backgroundColor: '#E3F6E8',
  },

  statusBadgeBusy: {
    backgroundColor: '#FFF0DC',
  },

  statusBadgeClosed: {
    backgroundColor: '#F1F1F1',
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },

  statusDotOpen: {
    backgroundColor: '#1E9A4B',
  },

  statusDotBusy: {
    backgroundColor: '#F27C22',
  },

  statusDotClosed: {
    backgroundColor: '#8A8A8A',
  },

  statusBadgeText: {
    fontSize: 13,
    fontWeight: '900',
  },

  statusTextOpen: {
    color: '#137A38',
  },

  statusTextBusy: {
    color: '#D86400',
  },

  statusTextClosed: {
    color: '#6E6258',
  },

  restaurantName: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
    letterSpacing: -0.4,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  locationIcon: {
    fontSize: 16,
    color: '#8B1E3F',
    marginRight: 6,
    fontWeight: '900',
  },

  restaurantMeta: {
    fontSize: 15,
    color: '#6E6258',
    fontWeight: '700',
  },

  cuisineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  cuisineChip: {
    backgroundColor: '#F6EEE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  cuisineChipText: {
    fontSize: 13,
    color: '#68152F',
    fontWeight: '800',
  },

  typeChip: {
    backgroundColor: '#F9F4EE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#EFE2D7',
  },

  typeChipText: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#EFE6DC',
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    borderRadius: 18,
    paddingVertical: 12,
    marginBottom: 16,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  statIcon: {
    fontSize: 15,
    color: '#8B1E3F',
    fontWeight: '900',
    marginBottom: 4,
  },

  statValue: {
    fontSize: 13,
    color: '#2A211C',
    fontWeight: '900',
    textAlign: 'center',
  },

  statLabel: {
    fontSize: 11,
    color: '#8B8178',
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#E7DED3',
  },

  viewButton: {
    backgroundColor: '#8B1E3F',
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },

  viewButtonArrow: {
    position: 'absolute',
    right: 18,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '400',
  },

  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E7DED3',
    padding: 22,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#6E6258',
    lineHeight: 22,
    fontWeight: '600',
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