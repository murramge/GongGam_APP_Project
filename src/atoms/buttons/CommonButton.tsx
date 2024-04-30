import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import {colors} from '@styles/color';

interface MainButtonProps {
  label: string;
  onPress?: () => void;
}

const CommonButton = ({label = '기본버튼', onPress}: MainButtonProps) => {
  return (
    <TouchableOpacity style={styles.CommonButton} onPress={onPress}>
      <Text style={styles.CommonButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CommonButton: {
    backgroundColor: colors.MAIN_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 32,
    margin: 2,
  },
  CommonButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CommonButton;
