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
      <Text>DetailPage</Text>
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
  dim: {
    position: 'absolute',
    width: '100%',
    height: 440,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 2,
  },
  photo: {
    width: '100%',
    height: 440,
  },
});

export default DetailPage;
