import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchHeaderButton from '../../atoms/buttons/SearchHeaderButton';
import {colors} from '@styles/color';
import StepHeader from '@components/header/StepHeader';
import CommunityList from '@components/cardlist/CommunityList';
import MyCommunityList from '@components/cardlist/MyCommunityList';
import MultiStepFormBottom from '@components/multistepform/MultiStepFormBottom';

interface CommunitySelectProps {
  onNext: any;
}

const CommunitySelect = ({}: CommunitySelectProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = () => setCurrentStep(prev => prev + 1);
  const goBack = () => setCurrentStep(prev => prev - 1);

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
      <MultiStepFormBottom
        currentStep={currentStep}
        maxStep={6}
        onPressNextButton={goToNext}
        onPressPrevButton={goBack}
      />
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
