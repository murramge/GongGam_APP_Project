import React from 'react';
import {Image, StyleSheet, Text, View, Animated} from 'react-native';
import BackHeader from './BackHeader';
import {colors} from '@styles/color';
import {useAtomValue} from 'jotai';
import {detailDataAtom} from '../../template/home/DetailPage';

const DetailBookingHeader = ({detailInfo, headerHeight}) => {
  return (
    detailInfo && (
      <Animated.View
        style={headerHeight && [styles.animated, {height: headerHeight}]}>
        <View style={styles.detailHeader}>
          <BackHeader
            label={detailInfo?.prfnm}
            Color={{labelColor: 'white', leftIconsColor: 'white'}}
          />
        </View>
        <View style={styles.dim}></View>
        <View>
          {detailInfo?.poster && (
            <Image
              style={styles.photo}
              source={{
                uri: detailInfo?.poster,
              }}
            />
          )}
        </View>
        <View style={styles.photoContainer}>
          {detailInfo?.poster && (
            <Image
              style={styles.photoView}
              source={{
                uri: detailInfo?.poster,
              }}
            />
          )}
        </View>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 19,
  },
  detailHeader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 10,
  },
  photoContainer: {
    position: 'absolute',
    top: 58,
    left: 88,
    width: 214,
    height: 287,
    zIndex: 7,
    backgroundColor: colors.BLACK,
  },
  photoView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 214,
    height: 287,
    zIndex: 20,
  },
  dim: {
    position: 'absolute',
    width: '100%',
    height: 360,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  photo: {
    width: '100%',
    height: 360,
  },
});

export default DetailBookingHeader;
