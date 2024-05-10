import {getPerformanceBoxOffice} from '@apis/kopis';
import {PerformanceBoxOffice} from '@apis/kopis.d';
import {useState} from 'react';

const useBoxOfficeList = () => {
  const [boxOfficeList, setBoxOfficeList] = useState<
    PerformanceBoxOffice[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBoxOfficeList = async (date: string) => {
    try {
      setLoading(true);
      const data = await getPerformanceBoxOffice({date, stsType: 'week'});
      setBoxOfficeList(data);
    } catch (e) {
      setError('에러가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {boxOfficeList, loading, error, fetchBoxOfficeList};
};

export default useBoxOfficeList;
