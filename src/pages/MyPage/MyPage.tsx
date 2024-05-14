import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {colors} from '@styles/color';
import MyPageMainHeader from '@components/mypage/MyPageMainHeader';
import MyPageMainList from '@components/mypage/MyPageMainList';
import SettingsList from './setting/SettingsList';

interface MyPageProps extends NativeStackScreenProps<RootStackParamList> {}

const MyPage = ({navigation: {navigate}}: MyPageProps) => {
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <View style={{height: 200, backgroundColor: colors.WHITE}}>
          <MyPageMainHeader />
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
          <MyPageMainList />
        </View>
        <View style={{top: 120}}>
          <SettingsList />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
