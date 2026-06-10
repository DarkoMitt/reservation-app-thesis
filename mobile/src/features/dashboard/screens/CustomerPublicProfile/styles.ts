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
    paddingBottom: 48,
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

  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
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

  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  heroInfo: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
    letterSpacing: -0.6,
  },

  subtitle: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 12,
  },

  heroBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },

  trustBadge: {
    backgroundColor: '#8B1E3F',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  riskBadge: {
    backgroundColor: '#2A211C',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  scoreHeroCard: {
    backgroundColor: '#9F1D4C',
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#8B1E3F',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  scoreHeroLabel: {
    color: '#F8DDE7',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  scoreHeroValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  scoreHeroMax: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F8DDE7',
  },

  scoreDivider: {
    width: 1,
    height: 54,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
    shadowColor: '#2A211C',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
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

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#2A211C',
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

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  statItem: {
    width: '47%',
    backgroundColor: '#F7F1E8',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  statIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  statIcon: {
    fontSize: 18,
  },

  statValue: {
    fontSize: 27,
    fontWeight: '900',
    color: '#8B1E3F',
  },

  statLabel: {
    fontSize: 12,
    color: '#6E6258',
    fontWeight: '900',
    marginTop: 4,
  },

  emptyBox: {
    backgroundColor: '#FFF7EC',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  emptyIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '700',
    textAlign: 'center',
  },

  ratingCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  ratingRestaurant: {
    fontSize: 16,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  ratingBadge: {
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
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
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },

  ratingDate: {
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '800',
  },
});