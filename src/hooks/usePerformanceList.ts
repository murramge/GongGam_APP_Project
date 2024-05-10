import {
  GenreCode,
  PerformanceInfo,
  AreaCodeKey,
  PerformanceGenreKey,
} from '@apis/kopis.d';
import {AreaCode} from '@apis/kopis.d';
import {getPerformanceList} from '@apis/kopis';
import {useState} from 'react';

const usePerformanceList = () => {
  const [performanceList, setPerformanceList] = useState<
    PerformanceInfo[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPerformanceList = async ({
    date,
    genre,
    area,
    performanceName,
  }: {
    date: string;
    genre?: PerformanceGenreKey;
    area?: AreaCodeKey;
    performanceName?: string;
  }) => {
    try {
      setLoading(true);
      const data = await getPerformanceList({
        page: 1,
        size: 1000,
        performanceName,
        startDate: date,
        endDate: date,
        genreCode: genre && GenreCode[genre],
        signguCode: area && AreaCode[area],
      });

      setPerformanceList(data);
    } catch (e) {
      setError('에러가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, performanceList, fetchPerformanceList};
};

export default usePerformanceList;
