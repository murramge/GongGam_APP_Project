// 현재 날짜를 기준으로 week와 현재의 date를 넘겨주는 로직

import {PerformanceStsType} from '@apis/kopis.d';
import dayjs from 'dayjs';

const usePerformanceDate = () => {
  const today = dayjs().format('YYYYMMDD');
  const stsType: PerformanceStsType[keyof PerformanceStsType] = 'week';
  return {today: today, stsType: stsType};
};

export default usePerformanceDate;
