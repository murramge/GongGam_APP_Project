import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {colors} from '@styles/color';

import BackHeader from '@components/header/BackHeader';
import CommonButton from '../../atoms/buttons/CommonButton';
const MeetingIntroduce = () => {
  const [name, onChangeName] = useState('');
  const [text, onChangeText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader label="모임의 상세 정보를 입력해 주세요" />
      <View style={{paddingHorizontal: 20}}>
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
            onChangeText={onChangeName}
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
            onChangeText={onChangeText}
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
      <View style={{width: 100, marginLeft: 100}}></View>
      <CommonButton label="다음" onPress={() => console.log(name, text)} />
    </View>
  );
};
export default MeetingIntroduce;
