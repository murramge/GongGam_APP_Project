import MyPageHeader from '@components/mypage/MyPageEditHeader';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {colors} from '@styles/color';
import {signOut} from '@apis/supabase/auth';
import MyPageMainHeader from '@components/mypage/MyPageMainHeader';
import MyPageMainList from '@components/mypage/MyPageMainList';
import SettingsList from './setting/SettingsList';

interface MyPageProps extends NativeStackScreenProps<RootStackParamList> {}

const MyPage = ({navigation: {navigate}}: MyPageProps) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={{height: 200, backgroundColor: colors.WHITE}}>
        <MyPageMainHeader></MyPageMainHeader>
      </View>
      <View
        style={{
          width: '100%',
          height: '20%',
          top: 160,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyPageMainList></MyPageMainList>
      </View>
      <View style={{top: 120}}>
        <SettingsList></SettingsList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
