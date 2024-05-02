import {getPerformanceDetail} from '@apis/kopis';

import {PerformanceDetailInfo} from '@apis/kopis.d';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Linking} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import AfterTicketingModal from '@components/modals/AfterTicketingModal';
import LottieViewAfter from 'lottie-react-native';

import {modalVisibleAtom} from '@components/modals/AfterTicketingModal';
import {useAtomValue, useSetAtom} from 'jotai';
import ThumbnailHeader from '@components/header/ThumbnailHeader';

type TicketingPageRouteParams = {
  Ticketing: {
    id: string;
  };
};

interface TicketingPageProps {
  route: RouteProp<TicketingPageRouteParams, 'Ticketing'>;
}

const TicketingPage: React.FC<TicketingPageProps> = ({route}) => {
  const {id} = route.params;
  const [detailInfo, setDetailInfo] = useState<PerformanceDetailInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const setModalVisible = useSetAtom(modalVisibleAtom);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getPerformanceDetail({performanceId: id});
        setDetailInfo(data);
      } catch (e) {
        console.error(e);
        setError('상세 정보를 불러오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  const priceArray = detailInfo?.pcseguidance.split(', ');

  const TicketingListItem: React.FC<{price: string; index: number}> = ({
    price,
    index,
  }) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.GRAY_200,
          flexDirection: 'row',
          paddingHorizontal: 20,
          backgroundColor: colors.WHITE,
        }}>
        <View style={{paddingRight: 16}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
            }}>
            <View
              style={{
                backgroundColor: colors.GRAY_200,
                height: 32,
                width: 32,
                borderRadius: 16,
                position: 'absolute',
                zIndex: 1,
              }}></View>
            <Text style={{zIndex: 2}}>{index + 1}</Text>
          </View>
        </View>
        <Text
          style={{
            alignItems: 'center',
            fontSize: 16,
            fontWeight: '600',
            color: colors.BLACK,
          }}>
          {price}
        </Text>

        <CommonButton
          label="예매하기"
          onPress={async () => {
            const searchQuery = `${encodeURIComponent(
              detailInfo?.genrenm || '',
            )}${encodeURIComponent(detailInfo?.prfnm || '')}티켓`;
            const url = `https://search.shopping.naver.com/search/all?query=${searchQuery}`;
            await Linking.openURL(url);
            setModalVisible(true);
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <ThumbnailHeader></ThumbnailHeader>
      <View style={{flexDirection: 'row', padding: 20}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: colors.BLACK}}>
          예매정보
        </Text>
        <Text>({priceArray?.length})건</Text>
      </View>
      {/* pcseguidance이 여러개면 map돌리기 */}
      <View>
        {detailInfo?.pcseguidance.length === 0 && (
          <Text> 예매 정보가 없습니다.</Text>
        )}
        {detailInfo?.pcseguidance.length >= 1 &&
          priceArray.map((item: string, index: number) => (
            <TicketingListItem key={index} price={item} index={index} />
          ))}
      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 30}}>
        <Text>예매사이트의 링크 연결 기능만 제공합니다.</Text>
        <Text>예매에 관련하여 어떠한 책임이 없습니다.</Text>
        <Text>목록의 공연장을 포함, 조건을 꼭! 확인해주세요.</Text>
      </View>
      {modalVisibleAtom && <AfterTicketingModal />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default TicketingPage;
