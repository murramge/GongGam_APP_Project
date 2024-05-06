import MyPageMainList from '@components/cardlist/MyPageMainList';
import MyPageHeader from '@components/header/MyPageHeader';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyPageTemplatesProps {}

const MyPageTemplates = ({}: MyPageTemplatesProps) => {
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

export default MyPageTemplates;
