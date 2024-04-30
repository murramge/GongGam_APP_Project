import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ArtItem from '../carditem/ArtItem';
import {getPerformanceBoxOffice, getPerformanceList} from '@apis/kopis';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceInfo,
  PerformanceStsType,
} from '@apis/kopis.d';
import SearchItem from '@components/carditem/SearchItem';

export interface SearchListProps {
  data: {
    title: string;
    photoUrl: string;
    period: string;
    place: string;
    cate: string;
    id: string;
  }[];
}

const SearchList = ({data}: SearchListProps) => {
  return (
    <View style={styles.boxOfficeContainer}>
      <View>
        <FlatList
          data={data}
          renderItem={({item: {cate, id, period, photoUrl, place, title}}) => {
            return (
              <SearchItem
                photoUrl={photoUrl ?? undefined}
                title={title}
                period={period}
                place={place}
                cate={cate}
                id={id}
              />
            );
          }}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxOfficeContainer: {},
  titleText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    marginLeft: 5,
  },
  separator: {
    width: 8,
  },
});

export default SearchList;
