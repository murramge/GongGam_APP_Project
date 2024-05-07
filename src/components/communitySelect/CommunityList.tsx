import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import CommunityItem from '@components/communitySelect/CommunityItem';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceStsType,
} from '@apis/kopis.d';
import {getPerformanceBoxOffice} from '@apis/kopis';

export interface CommunityListProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory | string;
  area?: string;
  setValue?: any;
  watch?: any;
}

const CommunityList = ({
  date,
  stsType,
  categoryCode,
  area,
  setValue,
  watch,
}: CommunityListProps) => {
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
  }, [date, stsType, categoryCode, area]);
  return (
    <View>
      <View>
        <FlatList
          data={performances}
          renderItem={({item: art}) => {
            return (
              <CommunityItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.area}
                id={art.mt20id}
                setValue={setValue}
                watch={watch}
              />
            );
          }}
          keyExtractor={item => item?.mt20id ?? 'defaultKey'}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: colors.GRAY_500,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
    marginLeft: 5,
  },
  separator: {
    width: 8,
  },
});

export default CommunityList;
