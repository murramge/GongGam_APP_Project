import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {PerformanceBoxOffice} from '@apis/kopis.d';
import {getPerformanceBoxOffice} from '@apis/kopis';
import MyCommunityItem from '@components/carditem/MyCommunityItem';

interface MyPageListProps {}

const MyPageMainList = ({}: MyPageListProps) => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date: '20240501',
          stsType: 'day',
        });
        data && setPerformances(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={{paddingVertical: 30}}>
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
        <View>
          <Text style={styles.myListTitle}>내가 약속한 모임</Text>
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
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default MyPageMainList;
