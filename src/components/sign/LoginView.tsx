import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import {LoginType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {loginInputValue} from '@utils/sign';
import {emailSignIn} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';

const LoginView = () => {
  const navigate = useNavigation();
  const {control, handleSubmit} = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit = async ({email, password}: LoginType) => {
    try {
      await emailSignIn({email, password});

      navigate.goBack();
    } catch (e) {
      Alert.alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <View style={styles.inputContainer}>
      {loginInputValue.map((item, index) => (
        <Controller
          key={index}
          control={control}
          name={item.name}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>{item.label}</Text>
              </View>
              <SignInput
                label={item.label}
                value={value}
                onChangeText={onChange}
                type={item.type}></SignInput>
            </>
          )}></Controller>
      ))}

      <View style={styles.button}>
        <CommonButton onPress={handleSubmit(onSignUpSubmit)} label="로그인" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 73,
    marginHorizontal: 20,
    gap: 5,
  },
  title: {
    color: colors.BLACK,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 22,
    marginBottom: 2,
  },
  button: {
    marginTop: 15,
  },
});

export default LoginView;
