import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

function BackButton(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.75}
      onPress={() => navigation.goBack()}>
      <Text style={styles.text}>‹ Back</Text>
    </TouchableOpacity>
  );
}

export default BackButton;