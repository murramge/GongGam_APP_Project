import {common} from '@styles/common';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface InputLabelProps {
  label: string;
  errorMessage?: string;
}

const InputLabel = ({label, errorMessage}: InputLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={common.inputLabel}>{label}</Text>
      {errorMessage && <Text style={common.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default InputLabel;
