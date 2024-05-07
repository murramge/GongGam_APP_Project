import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import useDetailNavigation from '@pages/Home/main/hooks/useDetailNavigation';

interface MainPageTopCardItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
  id: string;
}

const MainPageTopCardItem = ({
  photoUrl,
  title,
  period,
  place,
  id,
}: MainPageTopCardItemProps) => {
  const {width: viewportWidth} = Dimensions.get('window');
  const cardWidth = viewportWidth - 60;

  const datas = {id, photoUrl, title, period, place};
  const onPress = useDetailNavigation(datas);

  return (
    <TouchableOpacity onPress={onPress} style={{width: cardWidth, height: 154}}>
      <Image
        source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.period}>{period}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  title: {
    position: 'absolute',
    bottom: 30,
    left: 18,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  period: {
    position: 'absolute',
    bottom: 13,
    left: 18,
    color: 'white',
    letterSpacing: 0.12,
  },
});
export default MainPageTopCardItem;
