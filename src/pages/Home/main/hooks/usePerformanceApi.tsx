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

  useEffect(() => {
    const performanceApi = async () => {
      try {
        const data = await getPerformanceBoxOffice({
          date: date,
          stsType: stsType,
          categoryCode: categoryCode,
        });
        setPerformances(data);
      } catch (error) {
        console.log(error);
      }
    };
    performanceApi();
  }, [date, stsType, categoryCode]);

  return performances;
};

export default usePerformanceApi;
