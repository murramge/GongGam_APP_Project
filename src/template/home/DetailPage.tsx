import BackHeader from '@components/header/BackHeader';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@styles/color';
import React from 'react';
import {BackHandler, Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

type DetailPageRouteParams = {
  Detail: {
    photoUrl?: string;
    title: string;
    period: string;
    place: string;
    id: string;
    // prfruntime: string;
    // prfage: string;
    // prfcast: string;
    // prfcrew:string
  };
};

interface DetailPageProps {
  route: RouteProp<DetailPageRouteParams, 'Detail'>;
}

const DetailPage: React.FC<DetailPageProps> = ({route}) => {
  const {photoUrl, title, period, place, id} = route.params;
  return (
    <View>
      <View style={styles.detailHeader}>
        <BackHeader
          label={title}
          Color={{labelColor: 'white'}}
          rightIcon="arrow-forward-ios"
        />
      </View>
      <View style={styles.dim}></View>
      <View>
        {photoUrl && (
          <Image
            style={styles.photo}
            source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
          />
        )}
      </View>
      <View style={styles.photoContainer}>
        {photoUrl && (
          <Image
            style={styles.photoView}
            source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
          />
        )}
      </View>

      {/* 컨텐츠 */}
      <View style={styles.detailContainer}>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>런타임</Text>
          <Text style={styles.itemText}>prfruntime: '2시간'</Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>관람연령</Text>
          <Text style={styles.itemText}> prfage: '만 7세 이상'</Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>출연진</Text>
          <Text style={styles.itemText}>
            prfcast: '이중현, 박경주, 이호철, 이다혜, 안창현, 정다연, 문예주 등'
          </Text>
        </View>
        <View style={styles.detailItemList}>
          <Text style={styles.itemTitle}>제작진</Text>
          <Text style={styles.itemText}>
            prfcrew: '정승호, 유미양, 채송화 등'
          </Text>
        </View>
      </View>
    </View>
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
    top: 108,
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
    height: 440,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  photo: {
    width: '100%',
    height: 440,
  },
  detailContainer: {
    position: 'absolute',
    top: 440,
    left: 0,
    width: '100%',
    paddingVertical: 17,
    paddingHorizontal: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  detailItemList: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemTitle: {
    width: 50,
    color: colors.GRAY_500,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 30,
  },
  itemText: {
    width: 200,
    color: colors.GRAY_500,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DetailPage;
