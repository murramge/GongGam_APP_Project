import React, {useState} from 'react';
import CommonInput from '../../atoms/inputs/CommonInput';
import {colors} from '@styles/color';
import {StyleSheet, Text, View, Alert} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import {Loginschema} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginInputValue} from '@utils/sign';
import {FindPasswordInput} from '@utils/sign';
import BackHeader from '@components/header/BackHeader';

//import LoginView from '@components/sign/LoginView';
const FindPassword = () => {
  const [seconds, setSeconds] = useState(300); // 초기 시간 설정: 5분

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(Loginschema),
  });

  const onSignUpSubmit = data => {
    Alert.alert('successful', JSON.stringify(data));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader
        label="비밀번호 찾기"
        Color={{
          labelColor: colors.GRAY_500,
          leftIconsColor: colors.GRAY_500,
        }}
      />
      <View style={styles.inputContainer}>
        {FindPasswordInput.map((item, index) => (
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
                  {error && (
                    <Text
                      style={{
                        color: colors.MAIN_COLOR,
                        fontSize: 11,
                        paddingRight: 15,
                      }}>
                      {error.message}
                    </Text>
                  )}
                </View>
                <SignInput
                  label={item.label}
                  value={value}
                  onChangeText={onChange}
                  type={item.type}
                  error={error}></SignInput>
              </>
            )}></Controller>
        ))}
        <View></View>
        <View style={styles.button}>
          <CommonButton onPress={handleSubmit(onSignUpSubmit)} label="확인" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 73,
    marginHorizontal: 20,
    gap: 5,
    backgroundColor: colors.WHITE,
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

export default FindPassword;
