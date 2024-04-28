import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

interface MainUpperCardProps {
  item: any;
}

const MainUpperCard = ({item}: MainUpperCardProps) => {
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const cardWidth = viewportWidth - 40;

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
        source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${item.poster}`}}
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
        {item.prfnm}
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 13,
          left: 18,
          color: 'white',
          letterSpacing: 0.12,
        }}>
        {item.prfpd}
      </Text>
    </View>
  );
};
export default MainUpperCard;
