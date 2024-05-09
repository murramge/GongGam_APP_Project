import {colors} from '@styles/color';
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '(1, 1, 1, 0.5)',
      }}>
      <ActivityIndicator size="large" color={colors.MAIN_COLOR} />
      <Text>로딩중</Text>
    </View>
  );
};

export default Loading;
