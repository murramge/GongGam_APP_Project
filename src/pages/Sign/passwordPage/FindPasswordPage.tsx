import React from 'react';
import {colors} from '@styles/color';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {
  PasswordResetEmailSchema,
  PasswordResetEmailType,
} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import BackHeader from '@components/common/header/BackHeader';
import {sendPasswordResetLink} from '@apis/supabase/auth';
import Toast from 'react-native-toast-message';

const FindPassword = () => {
  const {control, handleSubmit} = useForm<PasswordResetEmailType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(PasswordResetEmailSchema),
  });

  const onSubmit = async ({email}: PasswordResetEmailType) => {
    try {
      // TODO: 로딩
      await sendPasswordResetLink(email);

      Toast.show({
        text1: '메일이 성공적으로 발송되었습니다.',
        type: 'success',
      });
    } catch (e) {
      Toast.show({
        text1: '메일을 발송하는 도중 에러가 발생하였습니다.',
        type: 'error',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader
        label="비밀번호 재설정 링크받기"
        Color={{
          labelColor: colors.GRAY_500,
          leftIconsColor: colors.GRAY_500,
        }}
      />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name={'email'}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>이메일</Text>
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
                label={'이메일'}
                value={value}
                onChangeText={onChange}
                error={error}
              />
            </>
          )}
        />
        <View style={styles.button}>
          <CommonButton onPress={handleSubmit(onSubmit)} label={'메일 발송'} />
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
