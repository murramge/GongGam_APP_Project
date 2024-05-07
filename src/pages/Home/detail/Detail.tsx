import DetailBookingHeader from '@components/common/header/DetailBookingHeader';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import DetailPageInfo from '../../../components/detail/DetailPageInfo';
import DetailPageContent from '../../../components/detail/DetailPageContent';
import DetailPageMap from '../../../components/detail/DetailPageMap';
import CommonButton from '../../../atoms/buttons/CommonButton';
import usePerformanceDetailApi from './hooks/usePerformanceDetailApi';
import {ActivityIndicator} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {colors} from '@styles/color';

type DetailRouteParams = {
  Detail: {
    id: string;
  };
};

interface DetailProps {
  route: RouteProp<DetailRouteParams, 'Detail'>;
}

const Detail: React.FC<DetailProps> = ({route}: DetailProps) => {
  const {navigate} = useNavigation();

  const {id} = route.params;

  const {detailInfo, loading, error} = usePerformanceDetailApi(id);
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  const gotoTicketing = () => {
    console.log('예매하기.');
    navigate('Ticketing', {id: detailInfo.mt20id});
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <ScrollView style={{flex: 1}}>
        <DetailBookingHeader detailInfo={detailInfo}></DetailBookingHeader>
        <DetailPageInfo></DetailPageInfo>
        <View style={{flex: 1}}>
          <DetailPageContent
            detailImgUrls={detailInfo?.styurls}></DetailPageContent>
          <DetailPageMap id={detailInfo?.mt10id}></DetailPageMap>
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

const styles = StyleSheet.create({});

export default Detail;
