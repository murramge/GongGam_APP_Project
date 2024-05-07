import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import SignInput from '@common/input/SignInput';
import {LoginType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {loginInputValue} from '@utils/sign';
import {emailSignIn} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const LoginForm = () => {
  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isAuthFail, setIsAuthFail] = useState<boolean>();
  const {control, handleSubmit} = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit = async ({email, password}: LoginType) => {
    try {
      await emailSignIn({email, password});

      goBack();
    } catch (e) {
      setIsAuthFail(true);
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
          render={({field: {value, onChange}}) => (
            <>
              <View style={styles.inputLabel}>
                <Text style={styles.title}>{item.label}</Text>
              </View>
              <SignInput
                label={item.label}
                value={value}
                onChangeText={onChange}
                type={item.type}
              />
            </>
          )}
        />
      ))}
      {isAuthFail && (
        <Text style={{color: colors.MAIN_COLOR}}>
          이메일 또는 비밀번호가 일치하지 않습니다.
        </Text>
      )}
      <TouchableOpacity onPress={() => navigate('FindPasswordPage')}>
        <Text style={{color: colors.MAIN_COLOR, textAlign: 'right'}}>
          비밀번호 찾기
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <CommonButton onPress={handleSubmit(onSignUpSubmit)} label="로그인" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 43,
    marginHorizontal: 20,
    gap: 5,
  },
  inputLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default LoginForm;
