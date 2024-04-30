import {getPerformanceDetail} from '@apis/kopis';
import BackHeader from '@components/header/BackHeader';
import {PerformanceDetailInfo} from '@apis/kopis.d';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import {stringify} from 'uuid';
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

  const priceList = detailInfo?.pcseguidance;
  const priceArray = detailInfo?.pcseguidance.split(', ');

  const TicketingListItem: React.FC<{price: string; index: number}> = ({
    price,
    index,
  }) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.GRAY_200,
          flexDirection: 'row',
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
        <Text style={{alignItems: 'center'}}>{price}</Text>

        <CommonButton
          label="예매하기"
          onPress={async () => {
            await console.log('예매사이트로 이동');
          }}
        />
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.detailHeader}>
        <BackHeader
          label={detailInfo?.prfnm}
          Color={{labelColor: 'white'}}
          rightIcon="arrow-forward-ios"
        />
      </View>
      <View style={styles.dim}></View>
      <View>
        {detailInfo?.poster && (
          <Image
            style={styles.photo}
            source={{
              uri: detailInfo?.poster,
            }}
          />
        )}
      </View>
      <View style={styles.photoContainer}>
        {detailInfo?.poster && (
          <Image
            style={styles.photoView}
            source={{
              uri: detailInfo?.poster,
            }}
          />
        )}
      </View>
      <View style={{flexDirection: 'row', padding: 20}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: colors.Black}}>
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

      <View>
        <Text>예매사이트의 링크 연결 기능만 제공합니다.</Text>
        <Text>예매에 관련하여 어떠한 책임이 없습니다.</Text>
        <Text>목록의 공연장을 포함, 조건을 꼭! 확인해주세요.</Text>
      </View>
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
    backgroundColor: colors.Black,
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
