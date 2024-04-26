import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {
  getPerformanceBoxOffice,
  getPerformanceDetail,
  getPerformanceList,
} from '@apis/kopis';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MainUpperCard from './MainUpperCard';
interface Item {
  image: any;
}

const MainUpperCardBar = () => {
  const shadowStyle = Platform.select({
    ios: {},
    android: {
      elevation: 8, // Android에서 그림자 효과지정
    },
  });

  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const cardWidth = viewportWidth - 60;
  const data: Item[] = [
    {image: require('@images/cardImg.png')},
    {image: require('@images/cardImg2.png')},
    {image: require('@images/cardImg3.png')},
  ];

  const _renderItem = ({item}: {item: Item}) => {
    return (
      //TODO: 컴포넌트 분리중
      //<MainUpperCard />
      <View
        style={{
          width: cardWidth, //
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

  //api 연결시도
  //   ERROR  Error in getBoxOffice: [AxiosError: Network Error]
  //  ERROR  An error occurred: [AxiosError: Network Error]
  //   async function fetchPerformanceBoxOffice() {
  //     try {
  //       const data = await getPerformanceBoxOffice({
  //         date: '20240423',
  //         stsType: 'day',
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.error('An error occurred:', error);
  //     }
  //   }

  //   fetchPerformanceBoxOffice();

  return (
    <View>
      <Carousel
        data={data}
        layout={'default'}
        renderItem={_renderItem}
        sliderWidth={viewportWidth}
        itemWidth={cardWidth}
        loop={true}
        activeSlideOffset={10}
        autoplay={false}
        inactiveSlideScale={0.8}
      />
      <Pagination dotsLength={data.length} activeDotIndex={1} />
    </View>
  );
};

export default MainUpperCardBar;
