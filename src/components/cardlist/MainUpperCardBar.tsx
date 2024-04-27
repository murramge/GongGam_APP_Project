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
    return (
      //TODO: 컴포넌트 분리중
      //<MainUpperCard />
      <View
        style={{
          width: cardWidth, //
          height: 185,
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
            bottom: 55,
            left: 38,
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
          }}>
          셜록홈즈 (울산)
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 37,
            left: 38,
            color: 'white',
            fontSize: 11,
            letterSpacing: 0.12,
          }}>
          2024.04.24-2024.04.30
        </Text>
      </View>
    );
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
      <View style={{marginTop: -45}}>
        <Pagination dotsLength={data.length} activeDotIndex={1} />
      </View>
    </View>
  );
};

export default MainUpperCardBar;
