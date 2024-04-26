import BackHeader from '@components/header/BackHeader';
import {RouteProp} from '@react-navigation/native';
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
          label="공연상세"
          Color={{labelColor: 'white'}}
          rightIcon="arrow-forward-ios"
        />
      </View>
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
  photo: {
    width: '100%',
    height: 440,
  },
});

export default DetailPage;
