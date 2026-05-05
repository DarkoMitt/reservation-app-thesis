import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

function BackButton(): React.JSX.Element | null {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.75}
      onPress={handleBackPress}>
      <Text style={styles.icon}>‹</Text>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

export default BackButton;