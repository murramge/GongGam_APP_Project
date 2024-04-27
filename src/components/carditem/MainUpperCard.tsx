import React from 'react';
import {View, Text, Image, Dimensions, Platform} from 'react-native';

interface Item {
  image: any;
}
const MainUpperCard = ({item}: {item: Item}) => {
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const cardWidth = viewportWidth - 60;

  const shadowStyle = Platform.select({
    ios: {},
    android: {
      elevation: 8, // Android에서 그림자 효과지정
    },
  });

  return (
    <View
      style={{
        width: cardWidth,
        height: 154,
        ...shadowStyle, // 그림자 스타일
      }}>
      <Image
        source={item.image}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          borderRadius: 16,
        }}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 30,
          left: 18,
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
        }}>
        셜록홈즈 (울산)
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 13,
          left: 18,
          color: 'white',
          letterSpacing: 0.12,
        }}>
        2024.04.24-2024.04.30
      </Text>
    </View>
  );
};

export default MainUpperCard;
