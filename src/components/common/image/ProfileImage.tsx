import {colors} from '@styles/color';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Octicons';

interface ProfileImageProps {
  uri?: string;
  size: number;
}

const ProfileImage = ({uri, size}: ProfileImageProps) => {
  return (
    <View
      style={[
        styles.imageContainer,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      {uri ? (
        <Image
          style={{width: size, height: size}}
          source={{uri: `${Config.SUPABASE_PUBLIC_IMAGE_BASE_URL}/${uri}`}}
        />
      ) : (
        <Icon
          style={{transform: [{translateY: size / 5}]}}
          size={size}
          name="person-fill"
          color={colors.GRAY_200}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileImage;
