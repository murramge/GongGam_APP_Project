import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {colors} from '@styles/color';
import WheelPicker from 'react-native-wheely';
import BackHeader from '@components/header/BackHeader';

const MeetingIntroduce = () => {
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
            onChangeText={onChangeText}
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
      <View style={{width: 100, marginLeft: 100}}>
        <WheelPicker
          selectedIndex={selectedIndex}
          options={['2', '3', '4', '5', '6', '7', '8', '9', '10']}
          onChange={index => setSelectedIndex(index)}
        />
      </View>
    </View>
  );
};
export default MeetingIntroduce;
