import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@styles/color';
import {atom, useAtom} from 'jotai';
import React, {useCallback, useState} from 'react';
import {useFormContext} from 'react-hook-form';
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
}

const CommunityItem = ({
  photoUrl,
  title,
  period,
  place,
  id,
  setValue,
  watch,
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
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.descriptionText}>{period}</Text>
            <Text style={styles.descriptionText}>{place}</Text>
            <View style={styles.cateArea}>
              <Text style={styles.cateText}>{place}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{width: '100%', height: 1, backgroundColor: colors.GRAY_200}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  selectcontainer: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.MAIN_COLOR,
  },
  photo: {
    width: 117,
    height: 144,
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
