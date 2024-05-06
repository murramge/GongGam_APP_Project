import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {colors} from '@styles/color';

import BackHeader from '@components/header/BackHeader';
import CommonButton from '../../atoms/buttons/CommonButton';
import StepHeader from '@components/header/StepHeader';
import MultiStepFormBottom from '@components/multistepform/MultiStepFormBottom';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {useFormContext} from 'react-hook-form';
const CommunityIntroduce = () => {
  const [name, onChangeName] = useState('');
  const [text, onChangeText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {setValue, watch} = useFormContext();

  useEffect(() => {
    console.log('?');
  }, [watch('communityContext')]);

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.BLACK,
            paddingVertical: 20,
          }}>
          모임명
        </Text>
        <TextInput
          placeholderTextColor={colors.GRAY_300}
          placeholder={'모임명이 짧을수록 이해하기 쉬워요'}
          onChangeText={text =>
            setValue('communityName', text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          style={{
            color: colors.GRAY_500,
            width: '100%',
            padding: 10,
            backgroundColor: colors.GRAY_100,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.BLACK,
            paddingVertical: 20,
          }}>
          모임소개
        </Text>
        <TextInput
          placeholderTextColor={colors.GRAY_300}
          placeholder={'예매하신 공연과 관련된 내용을 적어주세요'}
          onChangeText={text =>
            setValue('communityContext', text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          style={{
            color: colors.GRAY_500,
            width: '100%',
            height: 160,
            padding: 10,
            backgroundColor: colors.GRAY_100,
            borderRadius: 10,
            textAlignVertical: 'top',
          }}
        />
      </View>
      <View style={{paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.BLACK,
            paddingVertical: 20,
          }}>
          최대인원
        </Text>
      </View>
    </View>
  );
};
export default CommunityIntroduce;
