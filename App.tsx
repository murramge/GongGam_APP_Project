import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'jotai';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Provider>
        <Router />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
