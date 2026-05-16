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

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 16,
  },

  searchInput: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '600',
    marginBottom: 14,
  },

  filtersRow: {
    gap: 10,
    paddingBottom: 14,
  },

  filterChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DED3',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
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

  resultCount: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '800',
    marginBottom: 14,
  },

  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  emptyTitle: {
    fontSize: 18,
    color: '#2A211C',
    fontWeight: '800',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '500',
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  pastCard: {
    opacity: 0.78,
    backgroundColor: '#F3EADF',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },

  cardHeaderText: {
    flex: 1,
    paddingRight: 10,
  },

  restaurantName: {
    fontSize: 18,
    color: '#2A211C',
    fontWeight: '800',
    marginBottom: 4,
  },

  restaurantMeta: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '600',
  },

  statusBadge: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: '800',
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
  },

  pastStatusBadge: {
    backgroundColor: '#6E6258',
  },

  categoryText: {
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 8,
  },

  pastHintText: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 4,
  },

  viewMoreText: {
    fontSize: 13,
    color: '#8B1E3F',
    fontWeight: '800',
    marginTop: 8,
  },
});