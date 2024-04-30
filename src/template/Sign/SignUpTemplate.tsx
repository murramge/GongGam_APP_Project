import BackHeader from '@components/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../../atoms/inputs/LoginInput';
import CommonButton from '../../atoms/buttons/CommonButton';
import Entypo from 'react-native-vector-icons/Entypo';

interface SignUpTemplateProps {}

const SignUpTemplate = ({}: SignUpTemplateProps) => {
  return (
    <View>
      <BackHeader
        label="회원가입"
        Color={{labelColor: colors.GRAY_500, leftIconsColor: colors.GRAY_500}}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>이메일</Text>
        <InputField
          autoFocus
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          confirm="중복확인"
        />
        <Text style={styles.title}>비밀번호</Text>
        <InputField
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          icon={
            <Entypo name="eye-with-line" size={16} color={colors.GRAY_500} />
          }
        />
        <Text style={styles.title}>비밀번호 확인</Text>
        <InputField
          placeholder="비밀번호 확인"
          secureTextEntry
          returnKeyType="next"
          icon={
            <Entypo name="eye-with-line" size={16} color={colors.GRAY_500} />
          }
        />
        <Text style={styles.title}>닉네임</Text>
        <InputField
          autoFocus
          placeholder="닉네임"
          returnKeyType="join"
          blurOnSubmit={false}
          confirm="중복확인"
        />

        <View style={styles.button}>
          <CommonButton label="회원가입" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 73,
    marginHorizontal: 20,
  },
  title: {
    color: colors.MAIN_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 22,
    marginBottom: 2,
  },
  button: {
    marginTop: 15,
  },
});

export default SignUpTemplate;
