import {colors} from '@styles/color';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface ArtItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
}

const ArtItem = ({photoUrl, title, period, place}: ArtItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        {photoUrl && <Image style={styles.photo} source={{uri: photoUrl}} />}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.nameText}>{title}</Text>
        <Text style={styles.descriptionText}>{period}</Text>
        <Text style={styles.descriptionText}>{place}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    width: 135,
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

export default ArtItem;
