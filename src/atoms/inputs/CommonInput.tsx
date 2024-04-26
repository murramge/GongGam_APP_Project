import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {}

const CommonInput = ({}: CommonInputProps) => {
  return (
    <View>
      <TextInput
        placeholderTextColor="#92929D"
        placeholder="샘플입니다."></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
