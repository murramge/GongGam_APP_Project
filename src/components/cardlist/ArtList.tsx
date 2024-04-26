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
} from '@interfaces/kopis.interface';

export interface ArtListProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory;
  area?: string;
}

const ArtList = ({date, stsType, categoryCode, area}: ArtListProps) => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);

  console.log(performances);
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
  }, [date, stsType, categoryCode, area]);

  return (
    <View style={styles.boxOfficeContainer}>
      <Text style={styles.titleText}>인기</Text>
      <View>
        <FlatList
          horizontal
          data={performances}
          renderItem={({item: art}) => {
            return (
              <ArtItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.area}
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
  boxOfficeContainer: {
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
