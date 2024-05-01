import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router';
import LottieView from 'lottie-react-native';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTab'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const Splash: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTab');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@lotties/splash_ticket.json')}
        style={{width: 200, height: 200}}
        autoPlay
        loop
      />

      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  logo: {
    width: 254,
    height: 53,
  },
});

const logo = require('../assets/images/logo.png');
