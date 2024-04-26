import ArtList from '@components/cardlist/ArtList';

import MainUpperCardBar from '@components/cardlist/MainUpperCardBar';
import MainCategories, {
  selectAtom,
} from '@components/categories/MainCategories';
import SearchHeader from '@components/header/SearchHeader';
import React from 'react';
import {View} from 'react-native';
import {useAtomValue} from 'jotai';
import {PerformanceGenre} from '@utils/category';

const HomeTemplates = () => {
  const selectCategory = useAtomValue(selectAtom);
  const code = Object.keys(PerformanceGenre).find(
    key =>
      PerformanceGenre[key as keyof typeof PerformanceGenre] === selectCategory,
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 100}}>
      <SearchHeader></SearchHeader>
      <MainUpperCardBar></MainUpperCardBar>
      <MainCategories></MainCategories>
      <ArtList date="20240425" stsType="day" categoryCode={code}></ArtList>
    </View>
  );
};

export default HomeTemplates;
