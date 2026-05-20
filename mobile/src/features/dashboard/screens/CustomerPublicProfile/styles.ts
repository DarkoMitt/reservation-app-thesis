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
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 40,
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
    marginBottom: 14,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#6E6258',
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 18,
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
    marginBottom: 14,
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '700',
    marginBottom: 8,
  },

  scoreRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },

  scoreBox: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  scoreValue: {
    fontSize: 34,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  scoreLabel: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '800',
    marginTop: 4,
  },

  badgesRow: {
    flexDirection: 'row',
    gap: 12,
  },

  badge: {
    flex: 1,
    backgroundColor: '#8B1E3F',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },

  riskBadge: {
    flex: 1,
    backgroundColor: '#2A211C',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  statItem: {
    width: '47%',
    backgroundColor: '#F7F1E8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  statValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  statLabel: {
    fontSize: 12,
    color: '#6E6258',
    fontWeight: '800',
    marginTop: 4,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '600',
  },

  ratingCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  ratingRestaurant: {
    fontSize: 16,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  stars: {
    fontSize: 18,
    color: '#D99A2B',
    fontWeight: '900',
    marginBottom: 8,
  },

  reviewText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 8,
  },

  ratingDate: {
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '700',
  },
});