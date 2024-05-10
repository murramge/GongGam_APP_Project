// 메인페이지 하단 카드 view

import {colors} from '@styles/color';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MainPageBottomCardItem from './MainPageBottomCardItem';

const MainPageBottomCard = ({performanceData}) => {
  const [displayedData, setDisplayedData] = useState(
    performanceData.slice(0, 3),
  );
  const [dataIndex, setDataIndex] = useState(3);

  // 스크롤 시 추가 데이터를 불러오는 함수
  const loadMoreData = () => {
    // 추가로 불러올 데이터가 없는 경우 함수 종료
    if (dataIndex >= performanceData.length) return;

    // 다음 3개의 데이터를 현재 데이터에 추가
    const nextData = performanceData.slice(dataIndex, dataIndex + 3);
    setDisplayedData([...displayedData, ...nextData]);
    setDataIndex(dataIndex + 3);
  };

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
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
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
