import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {
  label: string | undefined;
}

const CommonInput = ({label}: CommonInputProps) => {
  return (
    <View>
      <TextInput placeholderTextColor="#92929D" placeholder={label}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommonInput;
