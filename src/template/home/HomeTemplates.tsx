import MainCategories from '@components/categories/MainCategories';
import SearchHeader from '@components/header/SearchHeader';
import React from 'react';
import {View} from 'react-native';
const HomeTemplates = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchHeader></SearchHeader>
      <MainCategories></MainCategories>
    </View>
  );
};

export default HomeTemplates;
