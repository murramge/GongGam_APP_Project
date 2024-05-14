//공연 정보 api 불러오는 Hook

import {getPerformanceBoxOffice} from '@apis/kopis';
import {useEffect, useState} from 'react';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceStsType,
} from '@apis/kopis.d';
import {atom, useAtom} from 'jotai';

export const boxofficeData = atom<PerformanceBoxOffice[]>([]);
export const isLoadingData = atom(true);
const usePerformanceApi = (
  date: string,
  stsType: PerformanceStsType[keyof PerformanceStsType],
  categoryCode?: keyof PerformanceCategory | string,
) => {
  const [performances, setPerformances] =
    useAtom<PerformanceBoxOffice[]>(boxofficeData);
  const [isLoading, setIsLoading] = useAtom(isLoadingData);

  useEffect(() => {
    const performanceApi = async () => {
      try {
        setIsLoading(true);
        const data = await getPerformanceBoxOffice({
          date: date,
          stsType: stsType,
          categoryCode: categoryCode,
        });
        console.log(data);
        setPerformances(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    performanceApi();
  }, [date, stsType, categoryCode]);

  return {performances, isLoading};
};

export default usePerformanceApi;
