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
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  restaurantName: {
    fontSize: 22,
    color: '#2A211C',
    fontWeight: '800',
    marginBottom: 6,
  },

  restaurantMeta: {
    fontSize: 14,
    color: '#6E6258',
    fontWeight: '600',
    marginBottom: 12,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#8B1E3F',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textTransform: 'capitalize',
  },

  sectionTitle: {
    fontSize: 18,
    color: '#2A211C',
    fontWeight: '800',
    marginBottom: 14,
  },

  infoText: {
    fontSize: 15,
    color: '#4B4038',
    fontWeight: '600',
    marginBottom: 10,
  },

  rejectedCard: {
    backgroundColor: '#FFECEC',
    borderWidth: 1,
    borderColor: '#F3B7B7',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  rejectedTitle: {
    fontSize: 18,
    color: '#B3261E',
    fontWeight: '800',
    marginBottom: 10,
  },

  rejectedReason: {
    fontSize: 14,
    color: '#7A1C15',
    fontWeight: '600',
    lineHeight: 22,
  },

  changeCard: {
    backgroundColor: '#FFF7EC',
    borderWidth: 1,
    borderColor: '#E7DED3',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  changeTitle: {
    fontSize: 18,
    color: '#8B1E3F',
    fontWeight: '800',
    marginBottom: 12,
  },

  changeReason: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 14,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#1E824C',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#C62828',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  viewRestaurantButton: {
    backgroundColor: '#8B1E3F',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },

  viewRestaurantButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C62828',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#C62828',
    fontSize: 15,
    fontWeight: '800',
  },

  pastStatusBadge: {
  backgroundColor: '#6E6258',
},

pastLabel: {
  fontSize: 12,
  color: '#8B8178',
  fontWeight: '800',
  textTransform: 'uppercase',
  marginBottom: 12,
},

upcomingLabel: {
  fontSize: 12,
  color: '#8B1E3F',
  fontWeight: '800',
  textTransform: 'uppercase',
  marginBottom: 12,
},

ratingCard: {
  backgroundColor: '#FFF7EC',
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 22,
  padding: 18,
  marginBottom: 16,
},

ratingInfoText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  marginBottom: 10,
},

ratingHintText: {
  fontSize: 13,
  color: '#6E6258',
  fontWeight: '600',
  lineHeight: 20,
},
});