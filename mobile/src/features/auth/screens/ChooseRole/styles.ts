import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 34,
    justifyContent: 'center',
  },

  logoBox: {
    alignItems: 'center',
    marginBottom: 12,
  },

  logoImage: {
    width: 86,
    height: 64,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2A211C',
    textAlign: 'center',
    marginTop: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 26,
    paddingHorizontal: 12,
  },

  roleCard: {
    minHeight: 154,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E7DED3',
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2A211C',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  customerCard: {
    backgroundColor: '#8B1E3F',
    borderColor: '#8B1E3F',
  },

  roleImage: {
    width: 108,
    height: 108,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: '#F3E7EA',
  },

  roleContent: {
    flex: 1,
    marginLeft: 14,
  },

  roleTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  restaurantRoleTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#8B1E3F',
    marginBottom: 10,
  },

  roleText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
  },

  roleTextDark: {
    fontSize: 13,
    color: '#4B4038',
    fontWeight: '700',
    marginBottom: 6,
  },

  arrow: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '300',
  },

  arrowDark: {
    fontSize: 34,
    color: '#8B1E3F',
    fontWeight: '300',
  },

  loginHint: {
    textAlign: 'center',
    color: '#6E6258',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },

  loginText: {
    textAlign: 'center',
    color: '#8B1E3F',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 6,
  },

  brandBadge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#8B1E3F',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
    shadowColor: '#8B1E3F',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  brandLogo: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
  },

  appName: {
    fontSize: 38,
    fontWeight: '900',
    color: '#2A211C',
    textAlign: 'center',
  },

  tagline: {
    fontSize: 15,
    color: '#8B1E3F',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
});