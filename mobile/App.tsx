import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/app/navigation/AuthNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;