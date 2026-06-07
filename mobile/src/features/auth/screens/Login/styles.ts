import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  topIllustrationBox: {
    alignItems: 'center',
    marginBottom: 18,
  },

  backgroundIllustration: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
    opacity: 0.28,
  },

  logoImage: {
    width: 78,
    height: 56,
    resizeMode: 'contain',
    marginTop: -44,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2A211C',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E6258',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E7DED3',
    padding: 20,
    shadowColor: '#2A211C',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  inputBox: {
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FFFDFC',
    borderWidth: 1,
    borderColor: '#D8CFC5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#8B1E3F',
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#2A211C',
    fontWeight: '600',
  },

  forgotPasswordText: {
    color: '#8B1E3F',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
    marginTop: 2,
    marginBottom: 18,
  },

  loginButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: '#8B1E3F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B1E3F',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E7DED3',
  },

  dividerText: {
    marginHorizontal: 12,
    color: '#8B8178',
    fontSize: 12,
    fontWeight: '800',
  },

  registerHint: {
    textAlign: 'center',
    color: '#6E6258',
    fontSize: 14,
    fontWeight: '600',
  },

  registerText: {
    textAlign: 'center',
    color: '#8B1E3F',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 6,
  },

  backgroundImage: {
    flex: 1,
  },

  backgroundImageStyle: {
    resizeMode: 'cover',
    opacity: 0.08,
  },
});