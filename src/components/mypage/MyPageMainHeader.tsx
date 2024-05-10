import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@styles/color';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import useProfileApi from '@pages/MyPage/hooks/useProfileApi';

interface MyPageMainHeaderProps {}

const MyPageMainHeader = ({}: MyPageMainHeaderProps) => {
  const {navigate} = useNavigation();
  const data = useProfileApi();
  console.log(data);
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
              uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}></Image>
          <View>
            <TouchableOpacity
              onPress={() => navigate('ProfileEdit')}
              style={{
                width: 30,
                height: 30,
                backgroundColor: colors.GRAY_100,
                borderRadius: 100,
                position: 'absolute',
                bottom: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome
                name="pen"
                size={15}
                color={colors.GRAY_500}></FontAwesome>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 16}}>
          <Text style={{fontSize: 24, fontWeight: '500', color: colors.WHITE}}>
            강은화
          </Text>
          <Text style={{color: colors.WHITE, fontSize: 11}}>
            murramge@gmail.com
          </Text>
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
});

export default MyPageMainHeader;
