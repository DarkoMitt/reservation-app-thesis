import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ChooseRoleScreen from './src/features/auth/screens/ChooseRole';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ChooseRoleScreen />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8', // кремаста боја како што договоривме
  },
});

export default App;