//공연 정보 api 불러오는 Hook

import {getPerformanceBoxOffice} from '@apis/kopis';
import {useEffect, useState} from 'react';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceStsType,
} from '@apis/kopis.d';

const usePerformanceApi = (
  date: string,
  stsType: PerformanceStsType[keyof PerformanceStsType],
  categoryCode?: keyof PerformanceCategory | string,
) => {
  const [performances, setPerformances] = useState<PerformanceBoxOffice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const performanceApi = async () => {
      try {
        setIsLoading(true);
        const data = await getPerformanceBoxOffice({
          date: date,
          stsType: stsType,
          categoryCode: categoryCode,
        });
        setPerformances(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    performanceApi();
    console.log(isLoading);
  }, [date, stsType, categoryCode]);

  return {performances, isLoading};
};

export default usePerformanceApi;
