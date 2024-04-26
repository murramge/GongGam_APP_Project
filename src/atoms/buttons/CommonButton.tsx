import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import {MAIN_COLOR} from '@styles/color';

interface MainButtonProps {}

const CommonButton = ({}: MainButtonProps) => {
  return (
    <TouchableOpacity style={styles.CommonButton}>
      <Text style={styles.CommonButtonText}>기본 버튼</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CommonButton: {
    backgroundColor: MAIN_COLOR,
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
