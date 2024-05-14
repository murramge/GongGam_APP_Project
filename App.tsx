import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'jotai';
import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';
import {RootStackParamList} from '@router.d';

function App(): React.JSX.Element {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['gonggam://'],
    config: {
      initialRouteName: 'MainTab',
      screens: {
        NewPasswordPage: 'reset/password',
        AuthHome: 'auth',
        MainTab: '*',
      },
    },
    subscribe(listener) {
      const onReceiveURL = ({url}: {url: string}) => {
        listener(parseUrl(url));
      };
      const subscription = Linking.addEventListener('url', onReceiveURL);

      return () => {
        subscription.remove();
      };
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();

      if (url != null) {
        return parseUrl(url);
      }

      return url;
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

const parseUrl = (url: string) => {
  let parsedUrl = url;
  if (url.includes('#')) {
    parsedUrl = url.replace('#', '?');
  }
  return parsedUrl;
};

export default App;
