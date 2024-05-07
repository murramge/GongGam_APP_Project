import {colors} from '@styles/color';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {LoginType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {loginInputValue} from '@utils/sign';
import {emailSignIn, resendVerificationEmail} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const LoginForm = () => {
  const {pop, navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [authError, setAuthError] = useState<string>();
  const {control, handleSubmit, getValues} = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit = async ({email, password}: LoginType) => {
    try {
      await emailSignIn({email, password});
      Toast.show({text1: '로그인 성공!', type: 'success'});
      pop(2);
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const onPressResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail(getValues('email'));
      Toast.show({text1: '인증 메일이 다시 전송되었습니다.', type: 'success'});
    } catch (e) {
      Toast.show({text1: '메일 전송 실패', type: 'error'});
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: colors.WHITE,
          }}>
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

            {authError &&
              (authError === 'Email not confirmed' ? (
                <View>
                  <Text style={{color: colors.MAIN_COLOR}}>
                    이메일 인증을 완료해주세요
                  </Text>
                  <TouchableOpacity
                    hitSlop={10}
                    onPress={onPressResendVerificationEmail}>
                    <Text
                      style={{
                        color: colors.MAIN_COLOR,
                        fontWeight: 'bold',
                      }}>
                      인증메일 재전송
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={{color: colors.MAIN_COLOR}}>
                  이메일 또는 비밀번호가 일치하지 않습니다.
                </Text>
              ))}
            <TouchableOpacity onPress={() => navigate('FindPasswordPage')}>
              <Text style={{color: colors.MAIN_COLOR, textAlign: 'right'}}>
                비밀번호 찾기
              </Text>
            </TouchableOpacity>

            <View style={styles.button}>
              <CommonButton
                onPress={handleSubmit(onSignUpSubmit)}
                label="로그인"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigate('SignUp');
              }}
              style={styles.authArea}>
              <Text style={styles.authText}>
                처음이신가요? <Text style={styles.pointText}>회원가입하기</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <Modal>
        <Text>{'회원가입 성공!\n이메일 인증을 해주세요'}</Text>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 43,
    marginHorizontal: 16,
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
    marginBottom: 2,
  },
  button: {
    marginTop: 15,
  },
  authArea: {
    alignItems: 'center',
  },
  authText: {
    marginTop: 22,
    color: colors.GRAY_300,
    fontSize: 15,
    marginBottom: 50,
  },
  pointText: {
    color: colors.MAIN_COLOR,
    fontWeight: '400',
  },
});

export default LoginForm;
