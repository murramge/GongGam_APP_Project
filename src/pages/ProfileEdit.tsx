import MyPageHeader from '@components/header/MyPageHeader';
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CommonButton from '../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import {colors} from '@styles/color';

interface ProfileEditProps {}

const ProfileEdit = ({}: ProfileEditProps) => {
  const [editnickname, setNickname] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: 'space-around',
      }}>
      <View>
        <MyPageHeader></MyPageHeader>
      </View>
      <View style={{padding: 10}}>
        <Text style={{padding: 10}}>닉네임</Text>
        <SignInput
          label="(기존닉네임)"
          value={editnickname}
          onChangeText={text => setNickname(text)}></SignInput>
        <Text style={{padding: 10}}>이메일</Text>
        <SignInput
          label="(기존이메일)"
          value=""
          onChangeText={text => console.log(text)}
          type="editable"></SignInput>
      </View>
      <View>
        <CommonButton label="완료"></CommonButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileEdit;
