import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAtomValue} from 'jotai';
import {detailDataAtom} from '../../pages/Home/detail/hooks/usePerformanceDetailApi';
import {PerformanceDetailInfo} from '@apis/kopis.d';

const LabelMap: Record<string, keyof PerformanceDetailInfo> = {
  런타임: 'prfruntime',
  관람연령: 'prfage',
  출연진: 'prfcast',
  제작진: 'prfcrew',
};

type LabelParams = keyof typeof LabelMap;

const DetailPageInfo = () => {
  const detailInfo = useAtomValue<PerformanceDetailInfo | undefined>(
    detailDataAtom,
  );

  const renderDetailItem = (label: LabelParams) => {
    const key = LabelMap[label];
    const value = detailInfo ? detailInfo[key] : null;
    return value ? (
      <View style={styles.detailItemList}>
        <Text style={styles.itemTitle}>{label}</Text>
        <Text style={styles.itemText}>{value}</Text>
      </View>
    ) : null;
  };

  return (
    detailInfo && (
      <View style={styles.detailContainer}>
        {renderDetailItem('런타임')}
        {renderDetailItem('관람연령')}
        {renderDetailItem('출연진')}
        {renderDetailItem('제작진')}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    left: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  detailItemList: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 28,
  },
  itemTitle: {
    width: 70,
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 30,
  },
  itemText: {
    flex: 1,
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DetailPageInfo;
