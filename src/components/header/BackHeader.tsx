import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BackHeaderProps {
  Color?: {
    leftIconsColor?: string;
    rightIconsColor?: string;
    labelColor?: string;
  };
  label: string;
  rightIcon?: string;
}

const BackHeader = ({
  Color = {
    leftIconsColor: 'black',
    rightIconsColor: 'black',
    labelColor: 'black',
  },
  label = '샘플입니다.',
  rightIcon = 'arrow-back-ios',
}: BackHeaderProps) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <TouchableOpacity>
        <Icon
          name="arrow-back-ios"
          color={Color.leftIconsColor}
          size={24}></Icon>
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 32,
            color: Color.labelColor,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
      <TouchableOpacity>
        <Icon name={rightIcon} color={Color.rightIconsColor} size={24}></Icon>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BackHeader;