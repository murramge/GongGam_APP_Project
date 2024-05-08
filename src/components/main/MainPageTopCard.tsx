import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MainPageTopCardItem from './MainPageTopCardItem';
import {colors} from '@styles/color';

const MainPageTopCard = ({performanceData}) => {
  const {width: viewportWidth} = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = useState(0);

  const _renderItem = ({item: art, index}) => (
    <View
      style={{
        marginBottom: 20,
        marginTop: 8,
      }}>
      <MainPageTopCardItem
        photoUrl={art.poster ?? undefined}
        title={art.prfnm}
        period={art.prfpd}
        place={art.area}
        id={art.mt20id}
      />
    </View>
  );

  return (
    <View style={[styles.container, {width: viewportWidth}]}>
      <View>
        <Carousel
          data={performanceData}
          layout="default"
          renderItem={_renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 75}
          loop={false}
          activeSlideAlignment={'center'}
          activeSlideOffset={10}
          autoplay={false}
          inactiveSlideScale={0.8}
          onSnapToItem={setActiveIndex}
        />
      </View>
      <View style={{marginTop: -25}}>
        <Pagination
          dotsLength={3} // Assume it's dynamic based on data
          activeDotIndex={activeIndex}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  activeDot: {
    width: 30,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.MAIN_COLOR, // Ensure colors.MAIN_COLOR is correctly imported
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default MainPageTopCard;
