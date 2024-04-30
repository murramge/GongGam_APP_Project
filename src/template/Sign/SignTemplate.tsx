import BackHeader from '@components/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {View} from 'react-native';

import SignUpView from '@components/sign/signUpView';
import LoginView from '@components/sign/LoginView';

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
          <LoginView></LoginView>
        </>
      )}
    </View>
  );
};

export default SignTemplate;
