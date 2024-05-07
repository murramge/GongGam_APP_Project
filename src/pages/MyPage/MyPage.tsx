import MyPageMainList from '@pages/MyPage/MyPageMainList';
import MyPageHeader from '@components/common/header/MyPageHeader';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MyPage = () => {
  return (
    <View style={{flex: 1}}>
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
