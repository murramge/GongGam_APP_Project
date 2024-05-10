import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface MyPageMainListProps {}

const MyPageMainList = ({}: MyPageMainListProps) => {
  return (
    <View
      style={{
        width: '90%',
        height: '100%',
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderRadius: 25,
        padding: 16,
        borderColor: colors.GRAY_100,
      }}>
      <Text style={{fontSize: 15, color: colors.BLACK}}>내 모임</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPageMainList;
