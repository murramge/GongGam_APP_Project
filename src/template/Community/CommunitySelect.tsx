import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SearchHeaderButton from '../../atoms/buttons/SearchHeaderButton';
import {colors} from '@styles/color';
import StepHeader from '@components/header/StepHeader';
import GrayButton from '../../atoms/buttons/GrayButton';
import CommonButton from '../../atoms/buttons/CommonButton';
import CommunityList from '@components/cardlist/CommunityList';
import MyCommunityList from '@components/cardlist/MyCommunityList';

interface CommunitySelectProps {
  onNext: any;
}

interface StepOneProps {
  onNext: () => void;
}

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

interface StepThreeProps {
  onBack: () => void;
}

const StepOne: React.FC<StepOneProps> = ({onNext}) => (
  <View>
    <Text>Step 1</Text>
    <Button title="Next" onPress={onNext} />
  </View>
);

const StepTwo: React.FC<StepTwoProps> = ({onNext, onBack}) => (
  <View>
    <Text>Step 2</Text>
    <Button title="Back" onPress={onBack} />
    <Button title="Next" onPress={onNext} />
  </View>
);

const StepThree: React.FC<StepThreeProps> = ({onBack}) => (
  <View>
    <Text>Step 3</Text>
    <Button title="Back" onPress={onBack} />
  </View>
);

const steps = [StepOne, StepTwo, StepThree];

const CommunitySelect = ({}: CommunitySelectProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = () =>
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const CurrentStepComponent = steps[currentStep];

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.searchInputArea}>
        <StepHeader label="함께 볼 공연을 선택해주세요" />
        <SearchHeaderButton></SearchHeaderButton>
      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        <View style={styles.communityList}>
          <CommunityList date="20240425" stsType="day"></CommunityList>
          <MyCommunityList date="20240425" stsType="day"></MyCommunityList>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.selectBottom}>
        <View style={styles.indicatorBar}>
          <View style={styles.step01}></View>
          <View style={styles.step02}></View>
          <View style={styles.step03}></View>
        </View>
        <View style={styles.stepBtnArea}>
          <View style={styles.prev}>
            <GrayButton label="이전" />
          </View>
          <View style={styles.next}>
            <CommonButton label="다음" />
          </View>
        </View>
      </View>

      {/* 스텝 */}
      {/* <View>
        <CurrentStepComponent onNext={goToNext} onBack={goBack} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  searchInputArea: {
    backgroundColor: colors.SEARCH_BG,
  },
  content: {
    flex: 1,
  },
  communityList: {
    flex: 0.65,
    marginHorizontal: 30,
  },
  selectBottom: {
    width: '93%',
    justifyContent: 'flex-end',
    marginHorizontal: 12,
    marginTop: 10,
  },
  indicatorBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.SEARCH_BG,
  },
  step01: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  step02: {
    position: 'absolute',
    top: 0,
    left: '33.5%',
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  step03: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  stepBtnArea: {
    flexDirection: 'row',
    marginTop: 28,
  },
  prev: {
    width: '50%',
  },
  next: {
    width: '50%',
  },
});

export default CommunitySelect;
