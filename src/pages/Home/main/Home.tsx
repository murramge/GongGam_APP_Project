import MainCategories from '@components/main/MainCategories';

import React from 'react';
import {View} from 'react-native';

import SearchHeaderButton from '../../../components/common/button/SearchHeaderButton';
import useCategorizedPerformances from '@pages/Home/main/hooks/useCategorizedPerformances';
import usePerformanceDate from '@hooks/usePerformanceDate';
import usePerformanceApi from '@hooks/usePerformanceApi';
import MainPageTopCard from '../../../components/main/MainPageTopCard';
import MainPageBottomCard from '../../../components/main/MainPageBottomCard';

const Home = () => {
  const code = useCategorizedPerformances();
  const performanceDate = usePerformanceDate();

  const performanceData = usePerformanceApi(
    performanceDate.today,
    performanceDate.stsType,
    code,
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchHeaderButton></SearchHeaderButton>
      <MainPageTopCard performanceData={performanceData}></MainPageTopCard>
      <MainCategories></MainCategories>
      <MainPageBottomCard
        performanceData={performanceData}></MainPageBottomCard>
    </View>
  );
};

export default Home;
