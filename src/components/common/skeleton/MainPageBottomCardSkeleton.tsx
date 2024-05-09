import React from 'react';
import {View} from 'react-native';
import {colors} from '@styles/color';

const MainPageBottomCardSkeleton = () => {
  return (
    <View
      style={{
        width: 150,
        height: 170,
        borderRadius: 12,
        backgroundColor: colors.GRAY_200,
      }}
    />
  );
};
export default MainPageBottomCardSkeleton;
