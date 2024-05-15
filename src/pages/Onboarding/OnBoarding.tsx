import CommonButton from '@atoms/buttons/CommonButton';
import {
  NextButtonComponent,
  SkipButtonComponent,
} from '@components/common/button/OnboardingButton';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import {colors} from '@styles/color';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

interface OnBoardingProps extends BottomTabBarProps {
  selected: boolean;
}

interface SquareProps {
  pageIndex: number | null;
}

const OnBoardingHome = ({navigation, selected}: OnBoardingProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const Square: React.FC<SquareProps> = ({pageIndex}) => {
    let backgroundColor =
      pageIndex === currentPageIndex ? colors.MAIN_COLOR : colors.GRAY_200;
    return <View style={[styles.square, {backgroundColor}]}></View>;
  };

  const navigateToMainTab = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  const Done = () => {
    return (
      <View style={styles.buttonSize}>
        <CommonButton
          label="시작하기"
          onPress={navigateToMainTab}></CommonButton>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const totalPages = 4;

  const handleNextPress = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      navigateToMainTab();
    }
  };

  return (
    <Onboarding
      SkipButtonComponent={() => (
        <SkipButtonComponent skipLabel="skip" onPress={navigateToMainTab} />
      )}
      NextButtonComponent={() => (
        <NextButtonComponent nextLabel="Next" onPress={handleNextPress} />
      )}
      // onSkip={navigateToMainTab}
      bottomBarColor="white"
      DotComponent={({selected}) => (
        <Square pageIndex={selected ? currentPageIndex : null} />
      )}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding01.png')}
              style={styles.imageSize}
            />
          ),
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding02.png')}
              style={styles.imageSize}
            />
          ),
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding03.png')}
              style={styles.imageSize}
            />
          ),
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../../assets/images/onboarding/onboarding04.png')}
              style={styles.imageSize}
            />
          ),
          title: '',
          subtitle: '',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    width: 6,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 50,
  },
  buttonSize: {width: 300, marginHorizontal: 40},
  imageSize: {width: 390, height: 812, marginTop: 120},
});

export default OnBoardingHome;
