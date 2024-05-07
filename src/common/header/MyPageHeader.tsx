import {colors} from '@styles/color';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ElevatedView from 'react-native-elevated-view';
import {getProfile} from '@apis/supabase/profile';
import {useNavigation} from '@react-navigation/native';
interface MyPageHeaderProps {
  type?: string;
}

const MyPageHeader = ({type}: MyPageHeaderProps) => {
  const {navigate} = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProfile();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
          paddingTop: 40,
        }}>
        {type == 'main' && (
          <>
            <TouchableOpacity onPress={() => navigate('ProfileEdit')}>
              <FontAwesome
                name="pen"
                size={27}
                color={colors.BLACK}
                style={{marginHorizontal: 10}}></FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Settings')}>
              <Ionicons
                name="settings-sharp"
                size={27}
                color={colors.BLACK}></Ionicons>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ElevatedView
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: colors.WHITE,
          }}
          elevation={5}>
          <Image
            resizeMode="cover"
            source={{
              uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}></Image>
        </ElevatedView>
        {type == 'main' ? (
          <View style={{padding: 20}}>
            <Text
              style={{color: colors.GRAY_400, fontSize: 20, fontWeight: '700'}}>
              Kangeunhwa
            </Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: colors.GRAY_100,
                borderRadius: 100,
                position: 'absolute',
                bottom: 0,
                left: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome name="camera" size={25}></FontAwesome>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default MyPageHeader;
