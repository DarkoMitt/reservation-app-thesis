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
    paddingTop: 45,
    paddingBottom: 32,
  },

  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B1E3F',
    marginBottom: 18,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6E6258',
  },

  markAllButton: {
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  markAllButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 12,
    color: '#6E6258',
    fontSize: 14,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#6E6258',
    textAlign: 'center',
    lineHeight: 20,
  },

  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  unreadNotificationCard: {
    borderColor: '#8B1E3F',
    borderWidth: 2,
  },

  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2E7E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  notificationIcon: {
    fontSize: 20,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#2A211C',
    marginRight: 8,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D62839',
  },

  notificationMessage: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B4038',
  },

  notificationDate: {
    marginTop: 10,
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '600',
  },
});