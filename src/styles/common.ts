import {StyleSheet} from 'react-native';
import {colors} from './color';

export const HEADER_HEIGHT = 55;

export const common = StyleSheet.create({
  inputLabel: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.MAIN_COLOR,
    fontWeight: '600',
  },
});
