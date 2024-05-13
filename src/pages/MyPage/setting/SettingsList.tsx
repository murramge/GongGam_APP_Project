import {deleteUser, signOut} from '@apis/supabase/auth';
import SettingsItems from '@pages/MyPage/setting/SettingsItems';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '@router.d';

interface SettingsListProps {}

const SettingsList = ({}: SettingsListProps) => {
  const {dispatch} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressSignOut = async () => {
    try {
      await signOut();

      dispatch(CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}));

      Toast.show({text1: '로그아웃 성공', type: 'success'});
    } catch (e) {
      Toast.show({text1: '에러가 발생했습니다.', type: 'error'});
    }
  };

  return (
    <View style={{paddingHorizontal: 5}}>
      <View style={{paddingVertical: 10}}>
        <SettingsItems
          title="알람"
          icons="bell-circle"
          subtitle="알람을 설정하세요"></SettingsItems>
        <SettingsItems
          title="로그아웃"
          icons="logout-variant"
          onPress={onPressSignOut}></SettingsItems>
        <SettingsItems
          title="회원탈퇴"
          icons="account-cancel"
          onPress={async () => {
            try {
              await deleteUser();
              dispatch(
                CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}),
              );
            } catch (_) {
              Toast.show({text1: '에러가 발생했습니다.', type: 'error'});
            }
          }}></SettingsItems>
        <SettingsItems
          title="문의하기"
          icons="card-account-phone"></SettingsItems>
        <SettingsItems
          title="개인정보처리방침"
          icons="shield-check"></SettingsItems>
        <SettingsItems
          title="앱 정보"
          icons="information-outline"></SettingsItems>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsList;
