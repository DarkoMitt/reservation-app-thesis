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
    paddingTop: 38,
    paddingBottom: 44,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },

  headerTextBox: {
    flex: 1,
    paddingRight: 14,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6E6258',
    fontWeight: '600',
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

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },

  statCardPrimary: {
    width: '48%',
    backgroundColor: '#8B1E3F',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 104,
    justifyContent: 'center',
    shadowColor: '#8B1E3F',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 104,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  statValue: {
    fontSize: 31,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#F3E7EA',
    fontWeight: '800',
  },

  statValueDark: {
    fontSize: 31,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 4,
  },

  statLabelDark: {
    fontSize: 13,
    color: '#6E6258',
    fontWeight: '800',
  },

  tabsRow: {
    paddingBottom: 16,
    gap: 10,
  },

  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  activeTabChip: {
    backgroundColor: '#8B1E3F',
    borderColor: '#8B1E3F',
  },

  tabText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#6E6258',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
  },

  loadingText: {
    marginTop: 10,
    color: '#6E6258',
    fontSize: 14,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E7DED3',
    alignItems: 'center',
    marginTop: 6,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6E6258',
    fontWeight: '600',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
    shadowColor: '#2A211C',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#8B1E3F',
    fontWeight: '800',
    lineHeight: 18,
  },

  infoText: {
    fontSize: 14,
    color: '#4B4038',
    marginBottom: 8,
    fontWeight: '700',
  },

  description: {
    fontSize: 13,
    color: '#6E6258',
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 12,
  },

  statusBadge: {
    backgroundColor: '#F3E7EA',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusBadgeWarning: {
    backgroundColor: '#FFF4D8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusBadgeDanger: {
    backgroundColor: '#B3261E',
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#A46A00',
    textTransform: 'capitalize',
  },

  statusBadgeTextDark: {
    fontSize: 11,
    fontWeight: '900',
    color: '#8B1E3F',
    textTransform: 'capitalize',
  },

  statusBadgeTextLight: {
    color: '#FFFFFF',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  approveButton: {
    flex: 1,
    backgroundColor: '#1E7A46',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#8B1E3F',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#B3261E',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 8,
    marginTop: 8,
  },

  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '700',
    marginBottom: 8,
  },

  textArea: {
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 15,
    paddingTop: 14,
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '700',
    textAlignVertical: 'top',
    marginBottom: 8,
  },

  targetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },

  targetChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DED3',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  activeTargetChip: {
    backgroundColor: '#8B1E3F',
    borderColor: '#8B1E3F',
  },

  targetChipText: {
    color: '#6E6258',
    fontSize: 13,
    fontWeight: '900',
  },

  activeTargetChipText: {
    color: '#FFFFFF',
  },

  recipientList: {
    backgroundColor: '#F7F1E8',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E7DED3',
    marginBottom: 14,
    height: 250,
  },

  recipientItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  activeRecipientItem: {
    borderColor: '#8B1E3F',
    backgroundColor: '#F3E7EA',
  },

  recipientName: {
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '900',
    marginBottom: 4,
  },

  searchInput: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2A211C',
    fontWeight: '700',
    marginBottom: 14,
  },

  activeRecipientName: {
    color: '#8B1E3F',
  },

  recipientMeta: {
    fontSize: 12,
    color: '#6E6258',
    fontWeight: '700',
  },

  sendButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(42, 33, 28, 0.55)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#2A211C',
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6E6258',
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 20,
    fontWeight: '600',
  },

  reasonInput: {
    minHeight: 112,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFDFC',
    borderRadius: 16,
    padding: 14,
    textAlignVertical: 'top',
    color: '#2A211C',
    fontWeight: '700',
  },

  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#EFE2D3',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#2A211C',
    fontWeight: '900',
    fontSize: 13,
  },

  rejectConfirmButton: {
    flex: 1,
    backgroundColor: '#8B1E3F',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },
});