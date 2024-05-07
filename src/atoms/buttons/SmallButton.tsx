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
  disabled?: any;
}

const SmallButton = ({
  label = '기본버튼',
  onPress,
  borderRadius = 50,
  margin = 2,
  bgColor = colors.MAIN_COLOR,
  disabled = false,
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.SmallButton,
        {backgroundColor: bgColor, borderRadius: borderRadius, margin: margin},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.SmallButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SmallButton: {
    paddingHorizontal: 20,
    backgroundColor: colors.MAIN_COLOR,
    paddingVertical: 10,
    borderRadius: 32,
  },
  SmallButtonText: {
    color: colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default SmallButton;
