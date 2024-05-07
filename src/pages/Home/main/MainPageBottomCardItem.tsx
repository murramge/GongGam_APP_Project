import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@styles/color';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {RootStackParamList} from '../../../router';
import useDetailNavigation from './hooks/useDetailNavigation';

interface MainPageBottomCardItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
  id: string;
}

const MainPageBottomCardItem = ({
  photoUrl,
  title,
  period,
  place,
  id,
}: MainPageBottomCardItemProps) => {
  const datas = {id, photoUrl, title, period, place};

  const onPress = useDetailNavigation(datas);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.photo}>
        {photoUrl && (
          <Image
            style={styles.photo}
            source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
          />
        )}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.nameText} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.descriptionText}>{period}</Text>
        <Text style={styles.descriptionText}>{place}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    width: 150,
    borderWidth: 1,
    margin: 5,
    borderColor: colors.GRAY_200,
    shadowColor: colors.GRAY_500,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  photo: {
    height: 178,
  },
  bottom: {
    padding: 12,
  },
  nameText: {
    color: colors.GRAY_500,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    color: colors.GRAY_300,
    fontSize: 10,
  },
});

export default MainPageBottomCardItem;
