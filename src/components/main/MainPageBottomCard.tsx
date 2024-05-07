// 메인페이지 하단 카드 view

import {colors} from '@styles/color';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MainPageBottomCardItem from './MainPageBottomCardItem';

const MainPageBottomCard = ({performanceData}) => {
  return (
    <View style={styles.boxOfficeContainer}>
      <Text style={styles.titleText}>인기</Text>
      <View>
        <FlatList
          horizontal
          data={performanceData}
          renderItem={({item: art}) => {
            return (
              <MainPageBottomCardItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.area}
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
  boxOfficeContainer: {
    marginLeft: 12,
  },
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

export default MainPageBottomCard;
