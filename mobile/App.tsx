import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/app/navigation/RootNavigator';
import AppModalAlert from './src/shared/components/AppModalAlert';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
      <AppModalAlert />
    </NavigationContainer>
  );
}

export default App;