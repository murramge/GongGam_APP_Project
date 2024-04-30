import BackHeader from '@components/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {View, Image} from 'react-native';
import SignUpView from '@components/sign/signUpView';
import LoginView from '@components/sign/LoginView';

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
          <SignUpView></SignUpView>
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
              <Image source={samplelogo}></Image>
            </View>
            <LoginView></LoginView>
          </View>
        </>
      )}
    </View>
  );
};

export default SignTemplate;
