import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, Platform} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MainUpperCard from '@components/carditem/MainUpperCard';
import {colors} from '@styles/color';
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

  const data: Item[] = [
    {image: require('@images/cardImg.png')},
    {image: require('@images/cardImg2.png')},
    {image: require('@images/cardImg3.png')},
  ];

  const _renderItem = ({item}: {item: Item}) => {
    return <MainUpperCard item={item} />;
  };

  //dot indicator 구현하기 위해
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        data={data}
        layout={'default'}
        renderItem={_renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 60}
        loop={false}
        activeSlideOffset={10}
        autoplay={false}
        inactiveSlideScale={0.8}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 30,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: colors.MAIN_COLOR,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
      />
    </View>
  );
};

export default MainUpperCardBar;
