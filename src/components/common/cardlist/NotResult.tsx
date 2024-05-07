import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NotResult = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>검색 결과가 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  text: {
    color: colors.GRAY_300,
    fontSize: 16,
  },
});

export default NotResult;
