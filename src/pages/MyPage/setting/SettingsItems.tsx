import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface SettingsItemsProps {
  title: string;
  icons: string;
  subtitle?: string;
  onPress?: () => void;
}

const SettingsItems = ({
  title = '알람',
  icons = 'bell-circle',
  onPress,
}: SettingsItemsProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 16,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: colors.SETTINGS_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <MaterialCommunityIcons
            name={icons}
            size={20}
            color={colors.MAIN_COLOR}></MaterialCommunityIcons>
        </View>
        <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
          <Text
            style={{fontSize: 16, fontWeight: '500', color: colors.GRAY_400}}>
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={colors.GRAY_300}></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default SettingsItems;
