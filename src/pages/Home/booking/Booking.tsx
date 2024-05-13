import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Linking} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import AfterTicketingModal from '@components/common/modals/AfterTicketingModal';

import {modalVisibleAtom} from '@components/common/modals/AfterTicketingModal';
import {useAtomValue, useSetAtom} from 'jotai';
import usePerformanceDetailApi from '@pages/Home/detail/hooks/usePerformanceDetailApi';
import DetailBookingHeader from '@components/common/header/DetailBookingHeader';
import SmallButton from '../../../atoms/buttons/SmallButton';
import {number} from 'zod';

type TicketingPageRouteParams = {
  Ticketing: {
    id: string;
  };
};

interface TicketingPageProps {
  route: RouteProp<TicketingPageRouteParams, 'Ticketing'>;
}

const TicketingPage: React.FC<TicketingPageProps> = ({
  route: {
    params: {id},
  },
}) => {
  const setModalVisible = useSetAtom(modalVisibleAtom);

  const {detailInfo, loading, error} = usePerformanceDetailApi(id);

  const TicketingListItem: React.FC<{
    name: string;
    url: string;
    index: number;
  }> = useCallback(({name, url, index}) => {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.wrapper}>
            <View style={styles.numberBg}></View>
            <Text style={{zIndex: 2}}>{index + 1}</Text>
          </View>
        </View>
        <Text style={styles.priceText}>{name}</Text>

        <SmallButton
          label="예매하기"
          onPress={async () => {
            await Linking.openURL(url);
            setModalVisible(true);
          }}
        />
      </View>
    );
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView style={styles.infoContainer}>
      <DetailBookingHeader detailInfo={detailInfo} />
      <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>예매정보 </Text>
        <Text style={styles.booking}>
          ({detailInfo?.relates.relate.length ?? 0})건
        </Text>
      </View>
      {/* pcseguidance이 여러개면 map돌리기 */}
      <View>
        {detailInfo?.relates.relate.length === 0 && (
          <Text> 예매 정보가 없습니다.</Text>
        )}
        {detailInfo!.relates.relate.length >= 1 &&
          detailInfo!.relates.relate.map(
            ({relatenm, relateurl}, index: number) => (
              <TicketingListItem
                key={index}
                name={relatenm}
                index={index}
                url={relateurl}
              />
            ),
          )}
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <Text style={styles.booking}>
          예매사이트의 링크 연결 기능만 제공합니다.
        </Text>
        <Text style={styles.booking}>
          예매에 관련하여 어떠한 책임이 없습니다.
        </Text>
        <Text style={styles.booking}>
          목록의 공연장을 포함, 조건을 꼭! 확인해주세요.
        </Text>
      </View>
      {modalVisibleAtom && <AfterTicketingModal />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  numberBg: {
    backgroundColor: colors.GRAY_200,
    height: 32,
    width: 32,
    borderRadius: 16,
    position: 'absolute',
    zIndex: 1,
  },
  detailHeader: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  photoContainer: {
    position: 'absolute',
    top: 50,
    left: 88,
    width: 214,
    height: 287,
    zIndex: 7,
    backgroundColor: colors.BLACK,
  },
  booking: {
    color: colors.GRAY_300,
    fontSize: 12,
  },
  priceText: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
  photoView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 214,
    height: 287,
    zIndex: 20,
  },
  dim: {
    position: 'absolute',
    width: '100%',
    height: 360,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  photo: {
    width: '100%',
    height: 360,
  },
  infoContainer: {
    flex: 1,
  },
  infoWrapper: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
});

export default TicketingPage;
