import BackHeader from '@components/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import InputField from '../../atoms/inputs/LoginInput';
import CommonButton from '../../atoms/buttons/CommonButton';
import Entypo from 'react-native-vector-icons/Entypo';

import {Alert, Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {Signschema, SignType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';


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

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      checkPassword: '',
    },
    resolver: zodResolver(Signschema),
  });

  const onSubmit = data => {
    Alert.alert('successful', JSON.stringify(data));
  };

  return (
    <View>
      <Controller
        control={control}
        name={'email'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="email"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Controller
        control={control}
        name={'name'}
        defaultValue={''}
        render={({field: {value, onChange}}) => (
          <TextInput
            placeholder="name"
            value={value}
            onChangeText={onChange}></TextInput>
        )}></Controller>
      <Controller
        control={control}
        name={'password'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="password"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Controller
        control={control}
        name={'checkPassword'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="checkPassword"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Button onPress={handleSubmit(onSubmit)} title="Submit"></Button>

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
