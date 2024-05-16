import {deleteUser, signOut} from '@apis/supabase/auth';
import SettingsItems from '@pages/MyPage/setting/SettingsItems';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '@router.d';
import ConfirmModal from '@components/common/modals/ConfirmModal';
import {rollbar} from '@apis/rollbar';

interface SettingsListProps {}

const SettingsList = ({}: SettingsListProps) => {
  const {dispatch} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isDeleteUserConfirmModalVisible, setIsDeleteUserConfirmModalVisible] =
    useState(false);

  const onPressSignOut = async () => {
    try {
      await signOut();

      dispatch(CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}));

      Toast.show({text1: '로그아웃 성공', type: 'success'});
    } catch (e: any) {
      rollbar.log(e);
      Toast.show({text1: '에러가 발생했습니다.', type: 'error'});
    }
  };
  const onPressConfirmUserDelete = async () => {
    try {
      await deleteUser();
      dispatch(CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}));
      Toast.show({text1: '회원탈퇴 되었습니다.', type: 'info'});
    } catch (e: any) {
      rollbar.log(e);
      Toast.show({text1: '에러가 발생했습니다.', type: 'error'});
    }
  };

  return (
    <>
      <View style={{paddingHorizontal: 5}}>
        <View style={{paddingVertical: 10}}>
          {/* <SettingsItems
          title="알람"
          icons="bell-circle"
          subtitle="알람을 설정하세요"></SettingsItems> */}
          <SettingsItems
            title="로그아웃"
            icons="logout-variant"
            onPress={onPressSignOut}
          />
          <SettingsItems
            title="회원탈퇴"
            icons="account-cancel"
            onPress={() => setIsDeleteUserConfirmModalVisible(true)}
          />
          <SettingsItems
            title="문의하기"
            icons="card-account-phone"
            onPress={() =>
              Toast.show({
                text1: '문의사항 : murramge@gmail.com',
                type: 'success',
              })
            }
          />
          <SettingsItems
            title="개인정보처리방침"
            icons="shield-check"
            onPress={() =>
              Linking.openURL(
                'https://drive.google.com/file/d/1hQaxERsM1lN4q-er80E-d9xKxV5kI3RC/view',
              )
            }
          />
          {/* <SettingsItems
          title="앱 정보"
          icons="information-outline"></SettingsItems> */}
        </View>
      </View>
      <ConfirmModal
        isVisible={isDeleteUserConfirmModalVisible}
        message={'정말로 탈퇴하시겠습니까?'}
        onConfirm={onPressConfirmUserDelete}
        onCancel={() => setIsDeleteUserConfirmModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsList;
