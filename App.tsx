import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      // eslint-disable-next-line @typescript-eslint/camelcase
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => {
      setIsReady(true);
    });
  }, []);
  return isReady ? (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  ) : null;
};

export default App;
