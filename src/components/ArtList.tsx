import {colors} from '@styles/color';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ArtItem from './ArtItem';

interface ArtListProps {}

const ArtList = ({}: ArtListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>인기</Text>
      <View>
        <FlatList
          horizontal
          data={dummy_feed}
          renderItem={({item: art}) => {
            return (
              <ArtItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.prfplcnm}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
  },
  titleText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 11,
    marginLeft: 5,
  },
  separator: {
    width: 8,
  },
});

export default ArtList;

const dummy_feed = [
  {
    id: 1,
    prfpd: '4/25~5/7',
    prfnm: '설록홈즈[울산]',
    prfplcnm: '소공연장',
    poster: 'https://picsum.photos/seed/picsum/135/178',
  },
  {
    id: 2,
    prfpd: '4/25~5/7',
    prfnm: '설록홈즈[울산]',
    prfplcnm: '소공연장',
    poster: 'https://picsum.photos/seed/picsum/135/178',
  },
  {
    id: 3,
    prfpd: '4/25~5/7',
    prfnm: '설록홈즈[울산]',
    prfplcnm: '소공연장',
    poster: 'https://picsum.photos/seed/picsum/135/178',
  },
  {
    id: 4,
    prfpd: '4/25~5/7',
    prfnm: '설록홈즈[울산]',
    prfplcnm: '소공연장',
    poster: 'https://picsum.photos/seed/picsum/135/178',
  },
  {
    id: 5,
    prfpd: '4/25~5/7',
    prfnm: '설록홈즈[울산]',
    prfplcnm: '소공연장',
    poster: 'https://picsum.photos/seed/picsum/135/178',
  },
];
