import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import {colors} from '@styles/color';
import BackHeader from '@components/common/header/BackHeader';
import CommonButton from '../../../atoms/buttons/CommonButton';
import StepHeader from '@components/common/header/StepHeader';
import MultiStepFormBottom from '@components/common/multistepform/MultiStepFormBottom';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../router';
import {useFormContext} from 'react-hook-form';

const CommunityIntroduce = () => {
  const [name, onChangeName] = useState('');
  const [text, onChangeText] = useState('');

  const [open, setOpen] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [items, setItems] = useState([
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
  ]);

  const {setValue, watch} = useFormContext();

  useEffect(() => {
    console.log(watch('communityParticipant'));
  }, [watch('communityParticipant')]);

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

        <View>
          <DropDownPicker
            open={open}
            value={participant}
            items={items}
            setOpen={setOpen}
            //setValue={setParticipant}
            setValue={value => {
              setValue('communityParticipant', value, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setParticipant(value);
            }}
            setItems={setItems}
            placeholder={`${participant || '모임참석 최대인원을 설정해주세요'}`}
            style={{borderColor: colors.GRAY_200}}
          />
        </View>
      </View>
    </View>
  );
};
export default CommunityIntroduce;
