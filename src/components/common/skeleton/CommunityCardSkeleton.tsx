import {colors} from '@styles/color';
import React from 'react';
import {View, Dimensions} from 'react-native';

const CommunityCardSkeleton = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        backgroundColor: colors.GRAY_100,
        borderRadius: 8,
        width: screenWidth - 40,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: colors.GRAY_200,
            width: 117,
            height: 144,
            borderRadius: 16,
            paddingVertical: 10,
          }}
        />
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              backgroundColor: colors.GRAY_200,
              width: screenWidth - 220,
              height: 20,
            }}
          />
          <View
            style={{
              backgroundColor: colors.GRAY_200,
              width: screenWidth - 220,
              height: 20,
              marginVertical: 20,
            }}
          />
          <View
            style={{
              backgroundColor: colors.GRAY_200,
              width: screenWidth - 220,
              height: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default CommunityCardSkeleton;
