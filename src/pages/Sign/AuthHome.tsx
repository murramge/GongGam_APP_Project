import {colors} from '@styles/color';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {kakaoSignIn} from '@apis/supabase/auth';

interface AuthHomeProps {}

const AuthHome = ({}: AuthHomeProps) => {
  const {navigate, goBack} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressKakaoButton = async () => {
    try {
      await kakaoSignIn();

      goBack();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@lotties/join.json')}
        style={{width: 150, height: 150}}
        autoPlay
        loop
      />
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.button}>
        <CommonButton
          label="회원가입"
          onPress={() => {
            navigate('SignUp');
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('Login');
        }}
        style={styles.authArea}>
        <Text style={styles.authText}>
          회원이신가요? <Text style={styles.pointText}>로그인하기</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.snsInfoArea}>
        <View style={styles.line} />
        <Text style={styles.snsInfoText}>Or Sign up with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.iconArea}>
        <TouchableOpacity>
          <Image source={googleIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressKakaoButton}>
          <Image source={kakaoIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 42,
    marginBottom: 80,
  },
  button: {
    width: '90%',
    marginHorizontal: 24,
  },
  authArea: {
    alignItems: 'center',
  },
  authText: {
    marginTop: 22,
    color: colors.GRAY_300,
    fontSize: 15,
    marginBottom: 50,
  },
  pointText: {
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  snsInfoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    width: 62,
    height: 1,
    borderTopWidth: 0.5,
    borderColor: colors.BLACK,
    backgroundColor: colors.BLACK,
  },
  snsInfoText: {
    color: colors.GRAY_300,
    fontSize: 14,
  },
  iconArea: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 28,
  },
  icon: {
    width: 70,
    height: 70,
  },
});

export default AuthHome;

const logo = require('../../assets/images/logo.png');
const googleIcon = require('../../assets/icons/google_btn.png');
const kakaoIcon = require('../../assets/icons/kakao_btn.png');
