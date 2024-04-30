import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface RecentButtonProps {
  label: string | undefined;
}

const RecentButton = ({label}: RecentButtonProps) => {
  return (
    <TouchableOpacity style={styles.recentBtn}>
      <Text style={styles.recentText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  recentBtn: {
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecentButton;
