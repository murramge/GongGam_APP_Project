import SettingsItems from '@components/carditem/SettingsItems';
import SettingsList from '@components/cardlist/SettingsList';
import BackHeader from '@components/header/BackHeader';
import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface SettingTemplatesProps {}

const SettingTemplates = ({}: SettingTemplatesProps) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader label="Settings"></BackHeader>
      <SettingsList></SettingsList>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingTemplates;
