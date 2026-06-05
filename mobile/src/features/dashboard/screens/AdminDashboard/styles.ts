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
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6E6258',
    marginBottom: 24,
  },

  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#8B1E3F',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 18,
  },

  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 14,
    color: '#F3E7EA',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  cardHeader: {
    marginBottom: 14,
  },

  restaurantName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 4,
  },

  restaurantType: {
    fontSize: 13,
    color: '#8B1E3F',
    fontWeight: '700',
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 8,
    fontWeight: '600',
  },

  description: {
    fontSize: 13,
    color: '#6E6258',
    lineHeight: 20,
    marginBottom: 14,
  },
  actionsRow: {
  flexDirection: 'row',
  marginTop: 12,
},

approveButton: {
  flex: 1,
  backgroundColor: '#2E7D32',
  paddingVertical: 13,
  borderRadius: 14,
  alignItems: 'center',
  marginRight: 10,
},

rejectButton: {
  flex: 1,
  backgroundColor: '#8B1E3F',
  paddingVertical: 13,
  borderRadius: 14,
  alignItems: 'center',
},

actionButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  paddingHorizontal: 22,
},

modalBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 18,
},

modalTitle: {
  fontSize: 20,
  fontWeight: '800',
  color: '#2A211C',
},

modalSubtitle: {
  fontSize: 14,
  color: '#6E6258',
  marginTop: 6,
  marginBottom: 14,
},

reasonInput: {
  minHeight: 110,
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 16,
  padding: 14,
  textAlignVertical: 'top',
  color: '#2A211C',
},

modalActions: {
  flexDirection: 'row',
  marginTop: 16,
},

cancelButton: {
  flex: 1,
  backgroundColor: '#EFE2D3',
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: 'center',
  marginRight: 10,
},

cancelButtonText: {
  color: '#2A211C',
  fontWeight: '800',
},

rejectConfirmButton: {
  flex: 1,
  backgroundColor: '#8B1E3F',
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: 'center',
},

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 20,
},

logoutButton: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#8B1E3F',
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 14,
},

logoutButtonText: {
  color: '#8B1E3F',
  fontSize: 13,
  fontWeight: '900',
},
});