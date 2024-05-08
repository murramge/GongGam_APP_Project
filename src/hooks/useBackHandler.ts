import {useEffect} from 'react';
import {BackHandler} from 'react-native';
/**
 * 안드로이드의 HardwareBackButton을 눌렀을 때 실행할 함수를 설정
 * @param onHardwareBackPresst 실행될 함수, 반환값에 따라 이벤트 버블링을 설정 할 수 있음, true: 이벤트 버블링 X, false: 이벤트 버블링 O
 */
const useBackHandler = (onHardwareBackPress: () => boolean) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress,
    );

    return () => backHandler.remove();
  }, [onHardwareBackPress]);
};

export default useBackHandler;
