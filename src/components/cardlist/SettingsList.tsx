import SettingsItems from '@components/carditem/SettingsItems';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface SettingsListProps {}

const SettingsList = ({}: SettingsListProps) => {
  return (
    <View style={{paddingHorizontal: 5}}>
      <View style={{paddingVertical: 10}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>일반</Text>
        </View>
        <SettingsItems
          title="알람"
          icons="bell-circle"
          subtitle="알람을 설정하세요"></SettingsItems>
        <SettingsItems
          title="기타"
          icons="dots-horizontal"
          subtitle="일반적인 설정들"></SettingsItems>
        <SettingsItems title="로그아웃" icons="logout-variant"></SettingsItems>
        <SettingsItems title="회원탈퇴" icons="account-cancel"></SettingsItems>
      </View>
      <View>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Support</Text>
        </View>
        <SettingsItems
          title="문의하기"
          icons="card-account-phone"></SettingsItems>
        <SettingsItems
          title="개인정보처리방침"
          icons="shield-check"></SettingsItems>
        <SettingsItems
          title="앱 정보"
          icons="information-outline"></SettingsItems>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsList;
