import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import {colors} from '@styles/color';

import {useFormContext} from 'react-hook-form';

const CommunityIntroduce = () => {
  const {getValues, setValue, watch} = useFormContext();
  const [open, setOpen] = useState(false);
  const [participant, setParticipant] = useState(
    getValues('communityParticipant'),
  );
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

  useEffect(() => {
    setValue('communityParticipant', participant, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [participant]);

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
          value={watch('communityName')}
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
          value={watch('communityContext')}
          multiline={true}
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
            value={watch('communityParticipant')}
            items={items}
            setOpen={setOpen}
            setValue={number => {
              setParticipant(number);
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
