import MainCategories from '@components/categories/MainCategories';
import BackHeader from '@components/header/BackHeader';
import SearchHeader from '@components/header/SearchHeader';
import React from 'react';
import {View} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import CommonInput from '../../atoms/inputs/CommonInput';
const HomeTemplates = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackHeader></BackHeader>
      <SearchHeader></SearchHeader>
      <MainCategories></MainCategories>
      <CommonButton></CommonButton>
      <CommonInput></CommonInput>
    </View>
  );
};

export default HomeTemplates;
