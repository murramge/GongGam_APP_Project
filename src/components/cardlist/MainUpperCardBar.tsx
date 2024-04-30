import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, Platform} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MainUpperCard from '@components/carditem/MainUpperCard';
import {colors} from '@styles/color';
import {getPerformanceBoxOffice} from '@apis/kopis';
import {PerformanceBoxOffice} from '@apis/kopis.d';
interface Item {
  image: any;
}

const MainUpperCardBar = () => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date: '20240425',
          stsType: 'day',
        });
        let topData = data.slice(0, 3);
        topData && setPerformances(topData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const shadowStyle = Platform.select({
    ios: {},
    android: {
      elevation: 8, // Android에서 그림자 효과지정
    },
  });
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');

  const _renderItem = ({item: art}) => {
    return (
      <MainUpperCard
        photoUrl={art.poster ?? undefined}
        title={art.prfnm}
        period={art.prfpd}
        place={art.area}
        id={art.mt20id}
      />
    );
  };

  //dot indicator 구현하기 위해
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={{width: viewportWidth}}>
      <View>
        <Carousel
          data={performances}
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
      </View>
      <View>
        <Pagination
          dotsLength={3}
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
    </View>
  );
};
export default MainUpperCardBar;
