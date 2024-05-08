import {colors} from '@styles/color';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';

interface CommunityItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
  id: any;
  setValue: any;
  watch: any;
  cate: string;
}

const CommunityItem = ({
  photoUrl,
  title,
  period,
  place,
  id,
  setValue,
  watch,
  cate,
}: CommunityItemProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setValue('artTitle', title, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue('artId', id, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue('artPhotoUrl', photoUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue('artGenre', cate, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        style={
          watch('artTitle') == title ? styles.selectcontainer : styles.container
        }>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.photo}>
            {photoUrl && (
              <Image
                style={styles.photo}
                source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
              />
            )}
          </View>
          <View style={styles.right}>
            <Text
              style={styles.nameText}
              numberOfLines={3}
              ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.descriptionText}>{period}</Text>
            <View style={styles.cateArea}>
              <Text style={styles.cateText}>{place}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: colors.LINE_COLOR,
  },
  selectcontainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: colors.GRAY_100,
    borderRadius: 4,
  },
  photo: {
    width: 117,
    height: 140,
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
  right: {
    marginTop: 13,
    marginLeft: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.LINE_COLOR,
  },
  nameText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    width: 180,
  },
  descriptionText: {
    color: colors.GRAY_300,
    fontSize: 12,
  },
  cateArea: {
    borderWidth: 0.5,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.SEARCH_BG,
    marginTop: 10,
    borderRadius: 4,
    width: 57,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingBottom: 2,
  },
  cateText: {
    color: colors.GRAY_500,
    fontSize: 10,
    paddingHorizontal: 10,
  },
});

export default CommunityItem;
