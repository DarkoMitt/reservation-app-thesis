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

  heroImage: {
    height: 190,
    backgroundColor: '#8B1E3F',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  heroText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 6,
  },

  meta: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '600',
    marginBottom: 8,
  },

  foodType: {
    fontSize: 14,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 14,
  },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  rating: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '800',
  },

  status: {
    fontSize: 14,
    color: '#2F7D32',
    fontWeight: '800',
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
    marginBottom: 12,
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
    fontWeight: '600',
    marginBottom: 8,
  },

  secondaryInfoText: {
    fontSize: 13,
    color: '#8B8178',
    fontWeight: '500',
    marginTop: 6,
  },

  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  featureChip: {
    backgroundColor: '#F7F1E8',
    color: '#8B1E3F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    fontSize: 13,
    fontWeight: '800',
  },

  reserveButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 18,
  },

  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  reservationStatusCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  reservationStatusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8B1E3F',
    marginBottom: 12,
  },

  reservationInfoText: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 8,
  },
});