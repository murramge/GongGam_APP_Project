import React, {useEffect} from 'react';
import {colors} from '@styles/color';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {PasswordResetSchema, PasswordResetType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {NewPasswordInput} from '@utils/sign';
import BackHeader from '@components/common/header/BackHeader';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {signInByAccessToken, updatePassword} from '@apis/supabase/auth';
import Toast from 'react-native-toast-message';
import useBackHandler from '@hooks/useBackHandler';
import TitleHeader from '@components/common/header/TitleHeader';

const NewPassword = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'NewPasswordPage'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {control, handleSubmit} = useForm<PasswordResetType>({
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(PasswordResetSchema),
  });

  useBackHandler(() => true);

  useEffect(() => {
    initiate();
    async function initiate() {
      try {
        await signInByAccessToken(params.access_token, params.refresh_token);
      } catch (e) {
        Toast.show({
          text1: '링크가 만료되었습니다.',
          text2: '비밀번호 찾기를 통해 링크를 다시 받으세요.',
          type: 'error',
        });

        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: 'MainTab'}, {name: 'AuthHome'}, {name: 'Login'}],
          }),
        );
      }
    }
  }, [params]);

  const onSubmit = async ({password}: PasswordResetType) => {
    try {
      await updatePassword(password);

      Keyboard.dismiss();
      // 키보드 닫할 때 까지 지연
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: 'MainTab'}, {name: 'AuthHome'}, {name: 'Login'}],
          }),
        );
      }, 100);

      Toast.show({text1: '비밀번호가 재설정되었습니다.', type: 'success'});
    } catch (error) {
      Toast.show({
        text1: '에러가 발생했습니다.',
        type: 'error',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <TitleHeader
        label="새 비밀번호 설정하기"
        Color={{
          labelColor: colors.GRAY_500,
        }}
      />
      <View style={styles.inputContainer}>
        {NewPasswordInput.map((item, index) => (
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
                  error={error}
                />
              </>
            )}
          />
        ))}

        <View style={styles.button}>
          <CommonButton onPress={handleSubmit(onSubmit)} label="확인" />
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

export default NewPassword;
