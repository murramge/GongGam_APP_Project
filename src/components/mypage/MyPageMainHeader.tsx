import React, {useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@styles/color';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import useProfileApi from '@pages/MyPage/hooks/useProfileApi';
import Config from 'react-native-config';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router';

interface MyPageMainHeaderProps {}

const MyPageMainHeader = ({}: MyPageMainHeaderProps) => {
  const isFocused = useIsFocused();
  const {profile, user, fetchProfiles} = useProfileApi();

  useEffect(() => {
    fetchProfiles();
  }, [isFocused]);

  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <LinearGradient
      colors={['#38B3F3', '#3544C4']}
      style={styles.linearGradient}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            source={{
              uri: profile?.image_url
                ? `${Config.SUPABASE_PUBLIC_IMAGE_BASE_URL}/${profile?.image_url}`
                : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <View>
            <TouchableOpacity
              onPress={() => navigate('ProfileEdit')}
              style={styles.profileEditButton}>
              <FontAwesome name="pen" size={15} color={colors.GRAY_500} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 16}}>
          <Text style={{fontSize: 24, fontWeight: '500', color: colors.WHITE}}>
            {profile?.nickname}
          </Text>
          <Text style={{color: colors.WHITE, fontSize: 11}}>{user?.email}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 30,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  profileEditButton: {
    width: 30,
    height: 30,
    backgroundColor: colors.GRAY_100,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyPageMainHeader;
