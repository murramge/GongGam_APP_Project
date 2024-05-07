import BackHeader from '@common/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import SignUpForm from '@components/signForm/signUpForm';
import LoginForm from '@components/signForm/LoginForm';
import LottieView from 'lottie-react-native';

const samplelogo = require('@images/samplelogo.png');

interface SignTemplateProps {
  type: string;
}

const SignTemplate = ({type}: SignTemplateProps) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      {type == 'signup' ? (
        <>
          <BackHeader
            label="회원가입"
            Color={{
              labelColor: colors.GRAY_500,
              leftIconsColor: colors.GRAY_500,
            }}
          />
          <SignUpForm />
        </>
      ) : (
        <>
          <BackHeader
            label="로그인"
            Color={{
              labelColor: colors.GRAY_500,
              leftIconsColor: colors.GRAY_500,
            }}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <LottieView
                source={require('@lotties/join.json')}
                style={{width: 150, height: 150}}
                autoPlay
                loop
              />
              <View>
                <Image source={logo} style={styles.logo} />
              </View>
            </View>
            <LoginForm></LoginForm>
          </View>
        </>
      )}
    </View>
  );
};

export default SignTemplate;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 42,
  },
});

const logo = require('@images/logo.png');
