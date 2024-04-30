import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {
  label: string | undefined;
  onChangeText: (text: string) => void;
}

const CommonInput = ({label, onChangeText}: CommonInputProps) => {
  return (
    <View>
      <TextInput
        placeholderTextColor="#92929D"
        placeholder={label}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
