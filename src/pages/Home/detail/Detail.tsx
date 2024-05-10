import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';
import DetailBookingHeader from '@components/common/header/DetailBookingHeader';
import DetailPageInfo from '../../../components/detail/DetailPageInfo';
import DetailPageContent from '../../../components/detail/DetailPageContent';
import DetailPageMap from '../../../components/detail/DetailPageMap';
import CommonButton from '../../../atoms/buttons/CommonButton';
import usePerformanceDetailApi from './hooks/usePerformanceDetailApi';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {colors} from '@styles/color';
import Loading from '../../../components/common/skeleton/Loading';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';

type DetailRouteParams = {
  Detail: {
    id: string;
  };
};

interface DetailProps
  extends NativeStackScreenProps<RootStackParamList, 'Detail'> {}

const Detail: React.FC<DetailProps> = ({
  route,
  navigation: {navigate},
}: DetailProps) => {
  const {id} = route.params;
  const {detailInfo, loading, error} = usePerformanceDetailApi(id);

  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_MAX_HEIGHT = 360;
  const HEADER_MIN_HEIGHT = 55;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  if (loading) return <Loading />;
  //<ActivityIndicator size="large" color={colors.MAIN_COLOR} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  const gotoTicketing = () => {
    navigate('Ticketing', {id: detailInfo.mt20id});
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  return (
    detailInfo && (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}>
          <View style={{paddingHorizontal: 16, paddingTop: 16}}>
            <DetailPageInfo />
          </View>
          <View style={styles.contentContainer}>
            <DetailPageContent detailImgUrls={detailInfo.styurls} />
            <DetailPageMap id={detailInfo.mt10id} />
          </View>
        </ScrollView>
        <DetailBookingHeader
          detailInfo={detailInfo}
          headerHeight={headerHeight}
        />
        <View
          style={
            detailInfo.prfstate === '공연완료'
              ? styles.completedShowButtonContainer
              : styles.buttonContainer
          }>
          <View
            style={
              detailInfo.prfstate === '공연완료'
                ? styles.buttonArea
                : styles.BookingbuttonArea
            }>
            <CommonButton
              label={
                detailInfo.prfstate === '공연완료'
                  ? '이미 종료된 공연입니다'
                  : '예매하기'
              }
              borderRadius={0}
              margin={0}
              onPress={gotoTicketing}
              disabled={detailInfo.prfstate === '공연완료'}
              bgColor={
                detailInfo.prfstate === '공연완료' ? colors.GRAY_300 : undefined
              }
            />
          </View>
          {detailInfo.prfstate !== '공연완료' && (
            <View style={styles.recruitButtonContainer}>
              <CommonButton
                label="같이 볼 사람 모집하기"
                borderRadius={0}
                margin={0}
                onPress={() => navigate('CommunitySelectLayOut')}
              />
            </View>
          )}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  completedShowButtonContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  buttonArea: {
    width: '100%',
    marginRight: 1,
  },
  BookingbuttonArea: {
    width: '40%',
    marginRight: 1,
  },
  recruitButtonContainer: {
    width: '60%',
  },
  errorText: {
    color: colors.MAIN_COLOR,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});

export default Detail;
