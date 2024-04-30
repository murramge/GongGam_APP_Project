import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import {colors} from '@styles/color';

interface MainButtonProps {
  label: string;
  onPress?: () => void;
  bgColor?: string;
  textColor?: string;
  borderRadius?: number;
  margin?: number;
}

const CommonButton = ({
  label = '기본버튼',
  onPress,
  borderRadius = 20,
  margin = 2,
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.CommonButton,
        {borderRadius: borderRadius, margin: margin},
      ]}
      onPress={onPress}>
      <Text style={styles.CommonButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CommonButton: {
    paddingHorizontal: 24,
    backgroundColor: colors.MAIN_COLOR,
    paddingVertical: 15,
    borderRadius: 20,
    margin: 2,
  },
  CommonButtonText: {
    color: colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CommonButton;
