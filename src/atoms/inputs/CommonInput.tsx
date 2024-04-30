import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {
  label: string | undefined;
  onChangeText: (text: string) => void;
  value?: string;
}

const CommonInput = ({label, value, onChangeText}: CommonInputProps) => {
  return (
    <View>
      <TextInput
        value={value}
        placeholderTextColor="#92929D"
        placeholder={label}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
