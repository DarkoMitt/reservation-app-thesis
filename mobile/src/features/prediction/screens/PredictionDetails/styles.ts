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

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8B1E3F',
    marginBottom: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    fontWeight: '600',
    marginBottom: 18,
  },

  riskCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 26,
    padding: 22,
    marginBottom: 16,
  },

  riskLabel: {
    fontSize: 14,
    color: '#F7E7ED',
    fontWeight: '700',
    marginBottom: 10,
  },

  riskValue: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  riskPercentage: {
    fontSize: 46,
    color: '#FFFFFF',
    fontWeight: '900',
    marginTop: 4,
  },

  riskHint: {
    marginTop: 12,
    fontSize: 12,
    color: '#F7E7ED',
    lineHeight: 18,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DED3',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2A211C',
    marginBottom: 12,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B4038',
    fontWeight: '700',
    marginBottom: 4,
  },

  factorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  factorBullet: {
    fontSize: 20,
    color: '#8B1E3F',
    fontWeight: '900',
    marginRight: 8,
    lineHeight: 22,
  },

  factorText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#4B4038',
    fontWeight: '700',
  },

  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B4038',
    fontWeight: '600',
  },

  updatedText: {
    fontSize: 12,
    color: '#8B8178',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
});