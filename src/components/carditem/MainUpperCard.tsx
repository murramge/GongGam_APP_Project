import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import {RootStackParamList} from '../../router';
interface ArtItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
  id: string;
}

const MainUpperCard = ({photoUrl, title, period, place, id}: ArtItemProps) => {
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const cardWidth = viewportWidth - 60;
  const shadowStyle = Platform.select({
    ios: {},
    android: {
      elevation: 8, // Android에서 그림자 효과지정
    },
  });

  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = useCallback(() => {
    navigate('Detail', {id, photoUrl, title, period, place});
  }, [id, photoUrl, title, period, place, navigate]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: cardWidth,
        height: 154,
        ...shadowStyle, // 그림자 스타일
      }}>
      <Image
        source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          borderRadius: 16,
        }}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 30,
          left: 18,
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 13,
          left: 18,
          color: 'white',
          letterSpacing: 0.12,
        }}>
        {period}
      </Text>
    </TouchableOpacity>
  );
};
export default MainUpperCard;
