import {colors} from '@styles/color';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface SkipButtonProps {
  skipLabel: string;
  onPress: () => void;
}

export const SkipButtonComponent: React.FC<SkipButtonProps> = ({
  skipLabel,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.skipText}>{skipLabel}</Text>
  </TouchableOpacity>
);

interface NextButtonProps {
  nextLabel: string;
  onPress: () => void;
}

export const NextButtonComponent: React.FC<NextButtonProps> = ({
  nextLabel,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.nextText}>{nextLabel}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  skipText: {
    color: colors.GRAY_300,
  },
  nextText: {
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
});
