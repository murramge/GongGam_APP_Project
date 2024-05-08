// Detail Navigation으로 이동하는 로직입니다. CardItem에서 두번 사용되길래 공통 로직으로 뺐습니다.

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {useCallback} from 'react';

const useDetailNavigation = datas => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = useCallback(() => {
    navigate('Detail', {...datas});
  }, [{...datas}, navigate]);

  return onPress;
};

export default useDetailNavigation;
