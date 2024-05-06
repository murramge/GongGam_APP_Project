import {colors} from '@styles/color';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';

interface CommonInputProps {
  label: string | undefined;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  visiable: boolean;
  editable: boolean;
}

const CommonInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  visiable = false,
  editable,
}: CommonInputProps) => {
  return (
    <View style={{width: '100%', flex: 1}}>
      <TextInput
        value={value}
        placeholderTextColor="#92929D"
        placeholder={label}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={visiable}
        style={{color: colors.GRAY_500, width: '100%'}}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
