import SettingsItems from '@pages/MyPage/setting/SettingsItems';
import SettingsList from '@pages/MyPage/setting/SettingsList';
import BackHeader from '@components/common/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Setting = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader label="Settings"></BackHeader>
      <SettingsList></SettingsList>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Setting;
