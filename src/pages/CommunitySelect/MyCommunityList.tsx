import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import CommunityItem from '@pages/CommunitySelect/CommunityItem';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceStsType,
} from '@apis/kopis.d';
import {getPerformanceBoxOffice} from '@apis/kopis';
import MyCommunityItem from '@pages/CommunitySelect/MyCommunityItem';

export interface MyCommunityListProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
}

const MyCommunityList = ({date, stsType}: MyCommunityListProps) => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date,
          stsType,
        });
        data && setPerformances(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date, stsType]);
  return (
    <View>
      <View>
        <Text style={styles.myListTitle}>내가 예매한 공연</Text>
        <FlatList
          horizontal
          data={performances}
          renderItem={({item: art}) => {
            return (
              <MyCommunityItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
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
  titleText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    marginLeft: 5,
  },
  separator: {
    width: 22,
  },

  myListTitle: {
    color: colors.GRAY_600,
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 3,
    marginTop: 10,
  },
});

export default MyCommunityList;
