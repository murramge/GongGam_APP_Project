import {colors} from '@styles/color';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {SignType, Signschema} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInputValue} from '@utils/sign';
import {checkEmailDuplication, emailSignUp} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';
import AlramModal from '@components/common/modals/AlramModal';
import Toast from 'react-native-toast-message';

const SignUpForm = () => {
  const [isSignUpCompleteModalVisible, setIsSignUpCompleteModalVisible] =
    useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, getValues, setError} = useForm<SignType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      checkPassword: '',
    },
    resolver: zodResolver(Signschema),
  });

  const checkDuplication = async (field: keyof SignType) => {
    if (field !== 'email') {
      return;
    }

    if (await checkEmailDuplication(getValues(field))) {
      setError(field, {message: DuplicationCheckField[field].message});
      return true;
    }
    return false;
  };

  const onSignUpSubmit = async ({email, name, password}: SignType) => {
    if (await checkDuplication('email')) {
      return;
    }

    try {
      await emailSignUp({email, password, nickname: name});

      setIsSignUpCompleteModalVisible(true);
    } catch (e) {
      Toast.show({text1: '에러가 발생했습니다.', type: 'error'});
    }
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: colors.WHITE,
        }}>
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
                    onBlur={() => checkDuplication(item.name)}
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
      </ScrollView>
      <AlramModal
        isVisible={isSignUpCompleteModalVisible}
        content={'회원가입이 완료되었습니다.\n이메일 인증을 완료해주세요!'}
        onPressConfirm={() => navigation.goBack()}
      />
    </>
  );
};

const DuplicationCheckField = {
  email: {message: '이미 사용중인 이메일입니다!'},
} as const;

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
