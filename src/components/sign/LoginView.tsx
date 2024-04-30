import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import {Loginschema} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginInputValue} from '@utils/sign';

const LoginView = () => {
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
