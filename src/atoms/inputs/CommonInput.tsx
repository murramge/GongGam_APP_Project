import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {
  label: string | undefined;
  onChangeText: (text: string) => void;
  value?: string;
  visiable: boolean;
}

const CommonInput = ({
  label,
  value,
  onChangeText,
  visiable = false,
}: CommonInputProps) => {
  return (
    <View>
      <TextInput
        value={value}
        placeholderTextColor="#92929D"
        placeholder={label}
        onChangeText={onChangeText}
        secureTextEntry={visiable}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
