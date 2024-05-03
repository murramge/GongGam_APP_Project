import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'jotai';

function App(): React.JSX.Element {
  const linking = {
    prefixes: ['gonggam://'],
    config: {
      screens: {
        NewPasswordPage: 'reset/password',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Provider>
        <Router />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
