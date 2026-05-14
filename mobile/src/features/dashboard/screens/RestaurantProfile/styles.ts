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
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 20,
  },

  progressCard: {
    backgroundColor: '#8B1E3F',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },

  progressTitle: {
    color: '#F3E7EA',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },

  progressValue: {
    color: '#FFFFFF',
    fontSize: 34,
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

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A211C',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2A211C',
  },

  textArea: {
    minHeight: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7DED3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 14,
    fontSize: 14,
    color: '#2A211C',
    textAlignVertical: 'top',
  },

  featuresTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A211C',
    marginBottom: 10,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE5DA',
  },

  switchLabel: {
    fontSize: 14,
    color: '#4B4038',
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  backText: {
  fontSize: 15,
  color: '#8B1E3F',
  fontWeight: '800',
  marginBottom: 14,
},

imageButton: {
  backgroundColor: '#8B1E3F',
  paddingVertical: 14,
  borderRadius: 16,
  alignItems: 'center',
  marginTop: 6,
},

imageButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

previewImage: {
  width: '100%',
  height: 180,
  borderRadius: 18,
  marginTop: 14,
  resizeMode: 'cover',
},
galleryGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 12,
},

thumbnailWrapper: {
  width: 96,
  height: 96,
  borderRadius: 14,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#EFE5DA',
},

thumbnailImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

removeImageButton: {
  position: 'absolute',
  top: 6,
  right: 6,
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#8B1E3F',
  alignItems: 'center',
  justifyContent: 'center',
},

removeImageText: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '800',
  lineHeight: 20,
},
});