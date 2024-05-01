import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router';
import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';

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

      <View style={styles.textArea}>
        <Text style={styles.splashText}>
          <Text style={styles.pointText}>공</Text>연의
          <Text style={styles.pointText}>감</Text>동을 한눈에,
        </Text>
        <Text style={styles.splashText}>
          언제 어디서나 <Text style={styles.pointText}>공감</Text>과 함께하세요
        </Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: 254,
    height: 54,
  },
  textArea: {
    marginTop: 15,
    width: 300,
    justifyContent: 'center',
  },
  splashText: {
    color: colors.GRAY_500,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  pointText: {
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
});

const logo = require('../assets/images/logo.png');
