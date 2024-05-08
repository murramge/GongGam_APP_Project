import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'jotai';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  const linking = {
    prefixes: ['gonggam://'],
    config: {
      screens: {
        NewPasswordPage: 'reset/password',
        AuthHome: 'auth',
        MainTab: '*',
      },
    },
  };

  return (
    <>
      <NavigationContainer linking={linking}>
        <Provider>
          <Router />
        </Provider>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
