import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyPageTemplates from '../template/MyPageTemplates';

interface MyPageProps {}

const MyPage = ({}: MyPageProps) => {
  return (
    <View style={{flex: 1}}>
      <MyPageTemplates></MyPageTemplates>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
