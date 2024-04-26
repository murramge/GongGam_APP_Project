import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import {colors} from '@styles/color';

interface MainButtonProps {
  label: string;
}

const CommonButton = ({label = '기본버튼'}: MainButtonProps) => {
  return (
    <TouchableOpacity style={styles.CommonButton}>
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
    margin: 10,
  },
  CommonButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CommonButton;
