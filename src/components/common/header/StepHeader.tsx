import React, {ReactNode} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {HEADER_HEIGHT} from '@styles/common';

interface StepHeaderProps {
  Color?: {
    leftIconsColor?: string;
    rightIconsColor?: string;
    labelColor?: string;
  };
  label: string | undefined;
  icon?: ReactNode;
  onPressCancel?: () => void;
}

const StepHeader = ({
  Color = {
    leftIconsColor: 'black',
    rightIconsColor: 'black',
    labelColor: 'black',
  },
  label,
  icon = null,
  onPressCancel,
}: StepHeaderProps) => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '8%', paddingTop: 5}}>
          <TouchableOpacity onPress={onPressCancel}>
            <Icon name="close" color={Color.leftIconsColor} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'flex-start', width: '90%'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              lineHeight: 32,
              color: Color.labelColor,
              fontWeight: '500',
              textAlign: 'left',
              marginLeft: 15,
            }}>
            {label}
          </Text>
        </View>
        <View style={{width: '5%'}}>
          <TouchableOpacity>{icon}</TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default StepHeader;
