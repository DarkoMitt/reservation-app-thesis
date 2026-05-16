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
    paddingTop: 18,
    paddingBottom: 32,
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
});