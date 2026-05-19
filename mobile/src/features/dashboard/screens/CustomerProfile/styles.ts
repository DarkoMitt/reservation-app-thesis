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
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B1E3F',
    marginTop: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E7D9C8',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 14,
  },
  infoText: {
    fontSize: 15,
    color: '#4D423B',
    marginBottom: 8,
    fontWeight: '600',
  },
  trustScoreCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F7F1E8',
    borderWidth: 2,
    borderColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  trustScoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#8B1E3F',
  },
  trustScoreLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6258',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#8B1E3F',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  totalStatsCard: {
  backgroundColor: '#8B1E3F',
  borderRadius: 22,
  paddingVertical: 22,
  paddingHorizontal: 18,
  alignItems: 'center',
  marginBottom: 16,
},

totalStatsNumber: {
  fontSize: 42,
  fontWeight: '900',
  color: '#FFFFFF',
},

totalStatsLabel: {
  fontSize: 14,
  fontWeight: '800',
  color: '#F7E8EE',
},

statsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

statBox: {
  width: '48%',
  backgroundColor: '#F7F1E8',
  borderRadius: 18,
  paddingVertical: 14,
  paddingHorizontal: 12,
  marginBottom: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  borderWidth: 1,
  borderColor: '#E7D9C8',
},

statIconCircle: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
},

statIcon: {
  fontSize: 18,
  fontWeight: '900',
  color: '#8B1E3F',
},

statValue: {
  fontSize: 24,
  fontWeight: '900',
  color: '#8B1E3F',
},

statLabel: {
  fontSize: 12,
  fontWeight: '800',
  color: '#6E6258',
  marginTop: 2,
},

  
});