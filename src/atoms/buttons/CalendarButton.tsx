import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import {colors} from '@styles/color';

interface CalendarButtonProps {
  label: string;
}

const CalendarButton = ({label = '기본버튼'}: CalendarButtonProps) => {
  return (
    <TouchableOpacity style={styles.CommonButton}>
      <Text style={styles.CommonButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CommonButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 32,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.MAIN_COLOR,
  },
  CommonButtonText: {
    color: colors.MAIN_COLOR,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CalendarButton;
