import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import CommonInput from '../../atoms/inputs/CommonInput';
import {colors} from '@styles/color';
import Entypo from 'react-native-vector-icons/Entypo';
import {FieldError} from 'react-hook-form';
import {useAtomValue, useSetAtom} from 'jotai';
import {authSecondsAtom} from '../../template/Sign/FindPasswordPage';
import {timerActiveAtom} from '../../template/Sign/FindPasswordPage';
import {sendResetLink} from '@apis/supabase/auth';

interface SignInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: FieldError;
  type?: string;
}

const SignInput = ({
  label = '아이디',
  value = '',
  onChangeText,
  error,
  type,
}: SignInputProps) => {
  const [visiable, setVisiable] = useState(true);

  const onVisiable = () => {
    if (visiable) {
      setVisiable(false);
    } else {
      setVisiable(true);
    }
  };
  const authSeconds = useAtomValue(authSecondsAtom);
  const setTimerActive = useSetAtom(timerActiveAtom);
  const setAuthSeconds = useSetAtom(authSecondsAtom);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const TypeForm = () => {
    switch (type) {
      case 'duplicate':
        return (
          <TouchableOpacity>
            <Text style={{fontSize: 12, color: colors.MAIN_COLOR}}>
              중복확인
            </Text>
          </TouchableOpacity>
        );
      case 'password':
        return visiable ? (
          <TouchableOpacity onPress={onVisiable}>
            <Entypo
              name="eye-with-line"
              size={16}
              color={colors.GRAY_500}></Entypo>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onVisiable}>
            <Entypo name="eye" size={16} color={colors.GRAY_500}></Entypo>
          </TouchableOpacity>
        );
      case 'requireAuth':
        return (
          <TouchableOpacity
            onPress={() => {
              console.log('인증번호 발송됨');
              setTimerActive(true);
              setAuthSeconds(300);
              sendResetLink();
            }}>
            <Text style={{fontSize: 12, color: colors.MAIN_COLOR}}>
              인증번호받기
            </Text>
          </TouchableOpacity>
        );
      case 'timer':
        return (
          <View>
            <Text
              style={{
                fontSize: 12,
                color: authSeconds > 0 ? colors.MAIN_COLOR : colors.GRAY_300,
              }}>
              {formatTime(authSeconds)}
            </Text>
          </View>
        );

      default:
        break;
    }
  };

  return (
    <View
      style={[
        styles.SignInput,
        error
          ? {borderColor: colors.MAIN_COLOR}
          : {borderColor: colors.GRAY_200},
      ]}>
      <CommonInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        visiable={type == 'password' ? visiable : false}></CommonInput>
      <TypeForm></TypeForm>
    </View>
  );
};

const styles = StyleSheet.create({
  SignInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});

export default SignInput;
