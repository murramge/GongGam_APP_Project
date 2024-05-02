import React, {useState, useEffect} from 'react';
import CommonInput from '../../atoms/inputs/CommonInput';
import {colors} from '@styles/color';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import {Loginschema} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginInputValue} from '@utils/sign';
import {FindPasswordInput} from '@utils/sign';
import BackHeader from '@components/header/BackHeader';
import {atom, useAtom, useAtomValue} from 'jotai';
import {sendResetLink} from '@apis/supabase/auth';
export const authSecondsAtom = atom(0);
export const timerActiveAtom = atom(false);

export const Timer = () => {
  const [authSeconds, setAuthSeconds] = useAtom(authSecondsAtom); // 초기 시간 설정: 5분 (5 * 60 = 10초)
  const [timerActive, setTimerActive] = useAtom(timerActiveAtom); // 타이머 활성화 상태
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && authSeconds > 0) {
      timer = setInterval(() => {
        setAuthSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(timer);
            setTimerActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000); // 1초마다 업데이트
    }
    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [authSeconds, timerActive]);

  //TODO: utils로 분리
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return;
};
const FindPassword = () => {
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

  const onAuthNumSubmit = (authNum: number, seconds: number) => {
    seconds > 0
      ? Alert.alert('successful', JSON.stringify(authNum))
      : Alert.alert('인증시간이 만료되었습니다.');
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

        <View style={styles.button}>
          <CommonButton
            onPress={() => {
              console.log('비밀번호 재설정링크 전송됨');
              sendResetLink();
            }}
            label={'메일 발송'}
          />
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
