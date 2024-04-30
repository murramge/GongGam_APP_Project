import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface CancelButtonProps {
  label: string | undefined;
  onPressText: () => void;
  onPressCancel: () => void;
}

const CancelButton = ({
  label,
  onPressText,
  onPressCancel,
}: CancelButtonProps) => {
  return (
    <View style={styles.recentBtn}>
      <TouchableOpacity onPress={onPressText}>
        <Text style={styles.recentText}>{label}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressCancel}>
        <Icon
          name="close"
          size={15}
          color={colors.GRAY_300}
          style={styles.recentIcon}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recentText: {
    color: colors.Black,
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 11,
    paddingVertical: 5,
  },
  recentBtn: {
    flexDirection: 'row',
    backgroundColor: colors.RECENT_BG,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default CancelButton;
