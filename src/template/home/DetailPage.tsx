import {getPerformanceDetail} from '@apis/kopis';
import BackHeader from '@components/header/BackHeader';
import {PerformanceDetailInfo} from '@apis/kopis.d';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import MainDetailsContent from '@components/details/MainDetailsContent';
import CommonButton from '../../atoms/buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';

import MainDetailsMap from '@components/details/MainDetailsMap';
import {atom, useAtom} from 'jotai';
import ThumbnailHeader from '@components/header/ThumbnailHeader';
import MainDetailsInfo from '@components/details/MainDetailsInfo';

type DetailPageRouteParams = {
  Detail: {
    id: string;
  };
};

interface DetailPageProps {
  route: RouteProp<DetailPageRouteParams, 'Detail'>;
}

export const detailDataAtom = atom<PerformanceDetailInfo | null>(null);

const DetailPage: React.FC<DetailPageProps> = ({route}) => {
  const {id} = route.params;
  const [detailInfo, setDetailInfo] = useAtom<PerformanceDetailInfo | null>(
    detailDataAtom,
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

  //임시 추가
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const gotoTicketing = () => {
    console.log('예매하기');
    navigate('Ticketing', {id});
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <ScrollView style={{flex: 1}}>
        <ThumbnailHeader></ThumbnailHeader>
        <MainDetailsInfo></MainDetailsInfo>
        <View style={{flex: 1}}>
          <MainDetailsContent
            detailImgUrls={detailInfo?.styurls}></MainDetailsContent>
          <MainDetailsMap id={detailInfo?.mt10id}></MainDetailsMap>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <View style={{width: '40%', marginRight: 1}}>
          <CommonButton
            label="예매하기"
            borderRadius={0}
            margin={0}
            onPress={gotoTicketing}
          />
        </View>
        <View style={{width: '60%'}}>
          <CommonButton
            label="같이 볼 사람 모집하기"
            borderRadius={0}
            margin={0}></CommonButton>
        </View>
      </View>
    </View>
  );
};

export default DetailPage;
