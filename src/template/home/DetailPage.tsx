import {getPerformanceDetail} from '@apis/kopis';
import BackHeader from '@components/header/BackHeader';
import {PerformanceDetailInfo} from '@apis/kopis.d';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import MainDetailsContent from '@components/details/MainDetailsContent';
type DetailPageRouteParams = {
  Detail: {
    id: string;
  };
};

interface DetailPageProps {
  route: RouteProp<DetailPageRouteParams, 'Detail'>;
}

const DetailPage: React.FC<DetailPageProps> = ({route}) => {
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

      {/* 컨텐츠 */}
      <View style={styles.detailContainer}>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>런타임</Text>
          <Text style={styles.itemText}>{detailInfo?.prfruntime}</Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>관람연령</Text>
          <Text style={styles.itemText}>{detailInfo?.prfage}</Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>출연진</Text>
          <Text style={styles.itemText}>{detailInfo?.prfcast}</Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>제작진</Text>
          <Text style={styles.itemText}>{detailInfo?.prfcrew}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <MainDetailsContent id={id} detailImgUrls={detailInfo?.styurls} />
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
  detailContainer: {
    left: 0,
    width: '100%',
    paddingVertical: 17,
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
    width: 200,
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DetailPage;
