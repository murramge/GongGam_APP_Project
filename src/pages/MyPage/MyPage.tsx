import MyPageMainList from '@pages/MyPage/MyPageMainList';
import MyPageHeader from '@components/common/header/MyPageHeader';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {colors} from '@styles/color';
import {signOut} from '@apis/supabase/auth';

interface MyPageProps extends NativeStackScreenProps<RootStackParamList> {}

const MyPage = ({navigation: {navigate}}: MyPageProps) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigate('AuthHome')}>
        <Text style={{color: colors.MAIN_COLOR, fontSize: 16}}>auth</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await signOut()}>
        <Text style={{color: colors.MAIN_COLOR, fontSize: 16}}>로그아웃</Text>
      </TouchableOpacity>
      <View>
        <MyPageHeader type="main"></MyPageHeader>
      </View>
      <View style={{flex: 1}}>
        <MyPageMainList></MyPageMainList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
