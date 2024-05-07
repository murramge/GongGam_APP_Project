//카테고리 (장르) 기반으로 데이터를 보여줄 수 있는 로직입니다.

import {useAtomValue} from 'jotai';
import {selectAtom} from '@components/main/MainCategories';
import {PerformanceGenre} from '@utils/category';

const useCategorizedPerformances = () => {
  const selectCategory = useAtomValue(selectAtom);
  const code = Object.keys(PerformanceGenre).find(
    key =>
      PerformanceGenre[key as keyof typeof PerformanceGenre] === selectCategory,
  );
  return code;
};

export default useCategorizedPerformances;
