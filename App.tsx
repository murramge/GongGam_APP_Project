import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text>ENV:{Config.ENV}</Text>
    </SafeAreaView>
  );
}

export default App;
