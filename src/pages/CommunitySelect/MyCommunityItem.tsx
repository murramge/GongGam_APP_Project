import {colors} from '@styles/color';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';

interface MyCommunityItemProps {
  photoUrl?: string;
  title: string;
  id: string;
}

const MyCommunityItem = ({photoUrl, title, id}: MyCommunityItemProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.photo}>
          {photoUrl && (
            <Image
              style={styles.photo}
              source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
            />
          )}
        </View>
        <View>
          <Text style={styles.nameText} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 15,
  },
  photo: {
    width: 77,
    height: 77,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    shadowColor: colors.GRAY_500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  nameText: {
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
    width: 77,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 18,
  },
});

export default MyCommunityItem;
