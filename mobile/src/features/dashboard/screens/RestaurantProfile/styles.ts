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
    paddingBottom: 145,
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

ratingSummaryCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 18,
  marginBottom: 18,
  borderWidth: 1,
  borderColor: '#E7DED3',
},

ratingSummaryTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#2A211C',
  marginBottom: 8,
},

ratingSummaryMain: {
  fontSize: 30,
  fontWeight: '900',
  color: '#D99A2B',
  marginBottom: 6,
},

ratingSummarySub: {
  fontSize: 14,
  color: '#6E6258',
  fontWeight: '600',
  marginBottom: 6,
},

ratingDetailsButton: {
  marginTop: 10,
  backgroundColor: '#8B1E3F',
  borderRadius: 14,
  paddingVertical: 12,
  alignItems: 'center',
},

ratingDetailsButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

ratingDetailsBox: {
  marginTop: 12,
  backgroundColor: '#F7F1E8',
  borderRadius: 16,
  padding: 14,
},

ratingDetailText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
  marginBottom: 8,
},

timeRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 14,
},

timeInput: {
  flex: 1,
  height: 48,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#E7DED3',
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  paddingHorizontal: 14,
},

timeInputText: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '700',
},

timeSeparator: {
  marginHorizontal: 10,
  fontSize: 18,
  fontWeight: '900',
  color: '#6E6258',
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.35)',
  justifyContent: 'center',
  paddingHorizontal: 24,
},

timeModal: {
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 18,
  maxHeight: '70%',
},

timeModalTitle: {
  fontSize: 20,
  fontWeight: '900',
  color: '#2A211C',
  marginBottom: 12,
},

timeOptionsList: {
  maxHeight: 360,
},

timeOption: {
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: '#EFE7DD',
},

timeOptionText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#2A211C',
  textAlign: 'center',
},

closeTimeButton: {
  marginTop: 14,
  backgroundColor: '#8B1E3F',
  borderRadius: 14,
  paddingVertical: 13,
  alignItems: 'center',
},

closeTimeButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '900',
},

dropdownButton: {
  height: 54,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#E7DED3',
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 16,
  marginBottom: 14,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

dropdownButtonText: {
  fontSize: 14,
  color: '#2A211C',
  fontWeight: '700',
},

dropdownPlaceholderText: {
  color: '#8B8178',
  fontWeight: '600',
},

dropdownArrow: {
  fontSize: 12,
  color: '#8B1E3F',
  fontWeight: '900',
},

dropdownList: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E7DED3',
  borderRadius: 16,
  marginTop: -6,
  marginBottom: 14,
  overflow: 'hidden',
},

dropdownItem: {
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#F0E7DD',
},

activeDropdownItem: {
  backgroundColor: '#F3E7EA',
},

dropdownItemText: {
  fontSize: 14,
  color: '#4B4038',
  fontWeight: '700',
},

activeDropdownItemText: {
  color: '#8B1E3F',
  fontWeight: '900',
},

imagePreviewOverlay: {
  flex: 1,
  backgroundColor: 'rgba(42, 33, 28, 0.92)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 18,
},

fullPreviewImage: {
  width: '100%',
  height: '72%',
  borderRadius: 22,
  resizeMode: 'contain',
},

imagePreviewCloseButton: {
  position: 'absolute',
  top: 48,
  right: 24,
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},

imagePreviewCloseText: {
  fontSize: 30,
  color: '#8B1E3F',
  fontWeight: '900',
  lineHeight: 32,
},
});