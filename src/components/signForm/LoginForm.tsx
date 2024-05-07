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
import {emailSignIn} from '@apis/supabase/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../router';
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
          {isAuthFail && (
            <Text style={{color: colors.MAIN_COLOR, marginLeft: 24}}>
              이메일 또는 비밀번호가 일치하지 않습니다.
            </Text>
          )}
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