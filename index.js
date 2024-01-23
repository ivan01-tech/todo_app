import 'react-native-gesture-handler';

/**
 * @format
 */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';
import {Provider} from 'react-redux';
function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
