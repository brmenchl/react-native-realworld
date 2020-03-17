import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
