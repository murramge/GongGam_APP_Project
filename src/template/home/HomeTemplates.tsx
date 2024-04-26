import ArtList from '@components/cardlist/ArtList';
import {
  PerformanceCategory,
  PerformanceStsType,
} from '@interfaces/kopis.interface';
import MainUpperCardBar from '@components/cardlist/MainUpperCardBar';
import MainCategories from '@components/categories/MainCategories';
import SearchHeader from '@components/header/SearchHeader';
import React from 'react';
import {View} from 'react-native';
import BackHeader from '@components/header/BackHeader';
interface HomeProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory;
  area?: string;
}
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
