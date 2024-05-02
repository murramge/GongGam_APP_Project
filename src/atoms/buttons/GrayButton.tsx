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

const GrayButton = ({
  label = '기본버튼',
  onPress,
  borderRadius = 20,
  margin = 2,
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.GrayButton, {borderRadius: borderRadius, margin: margin}]}
      onPress={onPress}>
      <Text style={styles.GrayButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  GrayButton: {
    paddingHorizontal: 24,
    backgroundColor: colors.GRAY_300,
    paddingVertical: 15,
    borderRadius: 32,
  },
  GrayButtonText: {
    color: colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default GrayButton;
