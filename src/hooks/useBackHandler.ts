import {useEffect} from 'react';
import {BackHandler} from 'react-native';

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
