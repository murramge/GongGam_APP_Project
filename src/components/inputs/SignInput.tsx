import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommonInput from '../../atoms/inputs/CommonInput';

interface SignInputProps {}

const SignInput = ({}: SignInputProps) => {
  return (
    <View style={styles.SignInput}>
      <CommonInput label="아이디를 입력해주세요"></CommonInput>
    </View>
  );
};

const styles = StyleSheet.create({
  SignInput: {
    borderWidth: 1,
    borderColor: '#838383',
    margin: 15,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});

export default SignInput;
