import MainCategories from '@components/main/MainCategories';

import React from 'react';
import {View, Dimensions} from 'react-native';

import SearchHeaderButton from '../../../components/common/button/SearchHeaderButton';
import useCategorizedPerformances from '@pages/Home/main/hooks/useCategorizedPerformances';
import usePerformanceDate from '@hooks/usePerformanceDate';
import usePerformanceApi from '@hooks/usePerformanceApi';
import MainPageTopCard from '../../../components/main/MainPageTopCard';
import MainPageBottomCard from '../../../components/main/MainPageBottomCard';
import {
  MainPageBottomCardSkeleton,
  MainPageTopCardSkeleton,
} from '../../../components/common/skeleton/MainPageBottomCardSkeleton';

const Home = () => {
  const code = useCategorizedPerformances();
  const performanceDate = usePerformanceDate();

  const {performances, isLoading} = usePerformanceApi(
    performanceDate.today,
    performanceDate.stsType,
    code,
  );
  console.log(isLoading);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchHeaderButton></SearchHeaderButton>
      {isLoading ? (
        <>
          <MainPageTopCardSkeleton />
          <MainCategories></MainCategories>
          <MainPageBottomCardSkeleton />
        </>
      ) : (
        <>
          <MainPageTopCard performanceData={performances}></MainPageTopCard>
          <MainCategories></MainCategories>
          <MainPageBottomCard
            performanceData={performances}></MainPageBottomCard>
        </>
      )}
    </View>
  );
};

export default Home;
