import {PerformanceDetailInfo, getPerformanceDetail} from '@apis/kopis';
import {atom, useAtom} from 'jotai';
import {useEffect, useState} from 'react';

export const detailDataAtom = atom<PerformanceDetailInfo | null>(null);

const usePerformanceDetailApi = id => {
  const [detailInfo, setDetailInfo] = useAtom<PerformanceDetailInfo | null>(
    detailDataAtom,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getPerformanceDetail({performanceId: id});
        console.log(data);
        setDetailInfo(data);
      } catch (e) {
        console.error(e);
        setError('상세 정보를 불러오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, []);

  console.log(detailInfo);
  return {detailInfo, loading, error};
};

export default usePerformanceDetailApi;
