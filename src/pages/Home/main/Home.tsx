import MainCategories from '@components/main/MainCategories';

import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';

import SearchHeaderButton from '../../../components/common/button/SearchHeaderButton';
import useCategorizedPerformances from '@pages/Home/main/hooks/useCategorizedPerformances';
import usePerformanceDate from '@hooks/usePerformanceDate';
import usePerformanceApi, {
  boxofficeData,
  isLoadingData,
} from '@hooks/usePerformanceApi';
import MainPageTopCard from '../../../components/main/MainPageTopCard';
import MainPageBottomCard from '../../../components/main/MainPageBottomCard';
import {
  MainPageBottomCardSkeleton,
  MainPageTopCardSkeleton,
} from '../../../components/common/skeleton/MainPageBottomCardSkeleton';
import {useAtomValue} from 'jotai';
import {getPerformanceBoxOffice} from '@apis/kopis';

const Home = () => {
  const isLoading = useAtomValue(isLoadingData);

  const [datas, setDatas] = useState([]);
  const [codeDatas, setCodeDatas] = useState([]);
  const performances = useAtomValue(boxofficeData);

  const code = useCategorizedPerformances();
  const performanceDate = usePerformanceDate();

  useEffect(() => {
    setDatas(performances);
  }, []);

  useEffect(() => {
    const codeApi = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date: performanceDate.today,
          stsType: performanceDate.stsType,
          categoryCode: code,
        });
        setCodeDatas(data);
      } catch (error) {
        console.log(error);
      }
    };
    codeApi();
  }, [code]);

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
          <MainPageTopCard performanceData={datas}></MainPageTopCard>
          <MainCategories></MainCategories>
          <MainPageBottomCard
            performanceData={
              codeDatas ? codeDatas : datas
            }></MainPageBottomCard>
        </>
      )}
    </View>
  );
};

export default Home;
