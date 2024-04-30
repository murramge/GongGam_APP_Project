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
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory | string;
  area?: string;
  cate?: string;
}

const SearchList = ({
  date,
  stsType,
  categoryCode,
  area,
  cate,
}: SearchListProps) => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date,
          stsType,
          categoryCode,
          area,
        });
        data && setPerformances(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date, stsType, categoryCode, area, cate]);

  return (
    <View style={styles.boxOfficeContainer}>
      <View>
        <FlatList
          data={performances}
          renderItem={({item: art}) => {
            return (
              <SearchItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.area}
                cate={art.cate}
                id={art.mt20id}
              />
            );
          }}
          keyExtractor={item => item?.mt20id ?? 'defaultKey'}
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
