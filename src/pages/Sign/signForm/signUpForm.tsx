import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import SignInput from '@common/input/SignInput';
import {SignType, Signschema} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInputValue} from '@utils/sign';
import {
  checkEmailDuplication,
  checkNicknameDuplication,
  emailSignUp,
} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';

const SignUpForm = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, getValues, trigger, setError} =
    useForm<SignType>({
      defaultValues: {
        email: '',
        name: '',
        password: '',
        checkPassword: '',
      },
      resolver: zodResolver(Signschema),
    });

  const checkDuplication = async (field: DuplicateCheckFieldKey) => {
    if (!(await trigger(field))) {
      return;
    }
    if (
      await (field === 'email'
        ? checkEmailDuplication
        : checkNicknameDuplication)(getValues(field))
    ) {
      setError(field, {message: DuplicationCheckField[field].message});
      return true;
    }
    return false;
  };

  const onSignUpSubmit = async (data: SignType) => {
    if ((await checkDuplication('email')) || (await checkDuplication('name'))) {
      return;
    }

    try {
      const {email, name, password} = data;

      await emailSignUp({email, password, nickname: name});
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };

  const onBlurDuplicateCheckField = async (field: DuplicateCheckFieldKey) => {
    await checkDuplication(field);
  };

  return (
    <View style={styles.inputContainer}>
      {signInputValue.map((item, index) => (
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
                onBlur={
                  item.name === 'email' || item.name === 'name'
                    ? async () => {
                        onBlurDuplicateCheckField(
                          item.name as DuplicateCheckFieldKey,
                        );
                      }
                    : undefined
                }
                type={item.type}
                error={error}
              />
            </>
          )}
        />
      ))}

      <View style={styles.button}>
        <CommonButton
          onPress={handleSubmit(onSignUpSubmit, e => {
            console.log(e);
          })}
          label="회원가입"
        />
      </View>
    </View>
  );
};

const DuplicationCheckField = {
  email: {message: '이미 사용중인 이메일입니다!'},
  name: {message: '이미 사용중인 닉네임입니다!'},
} as const;
type DuplicateCheckFieldKey = keyof typeof DuplicationCheckField;

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

export default SignUpForm;
