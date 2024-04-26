import ArtList from '@components/cardlist/ArtList';
import MainUpperCardBar from '@components/cardlist/MainUpperCardBar';
import MainCategories from '@components/categories/MainCategories';
import SearchHeader from '@components/header/SearchHeader';
import React from 'react';
import {View} from 'react-native';

const HomeTemplates = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 100}}>
      <SearchHeader></SearchHeader>
      <MainUpperCardBar></MainUpperCardBar>
      <MainCategories></MainCategories>
      <ArtList date="20240425" stsType="day"></ArtList>
    </View>
  );
};

export default HomeTemplates;
