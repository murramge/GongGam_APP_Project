import {colors} from '@styles/color';
import React from 'react';
import {View} from 'react-native';

const CommunityCardSkeleton = () => {
  return (
    <View style={{backgroundColor: colors.GRAY_100, borderRadius: 4}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colors.GRAY_300,
            width: 117,
            height: 144,
            borderRadius: 16,
          }}
        />
        <View style={{paddingVertical: 10}}>
          <View
            style={{backgroundColor: colors.GRAY_300, width: 120, height: 20}}
          />
          <View
            style={{backgroundColor: colors.GRAY_300, width: 120, height: 20}}
          />
          <View
            style={{backgroundColor: colors.GRAY_300, width: 120, height: 20}}
          />
        </View>
      </View>
    </View>
  );
};
export default CommunityCardSkeleton;
