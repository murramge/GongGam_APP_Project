import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StepHeader from '../common/header/StepHeader';
import MultiStepFormBottom from '../common/multistepform/MultiStepFormBottom';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import CommunitySelect from '@pages/CommunitySelect/stappage/ArtSelectFirstStap';
import ArtDaysTwoStap from '@pages/CommunitySelect/stappage/ArtDaysTwoStap';
import ArtTimesThreeStap from '@pages/CommunitySelect/stappage/ArtTimesThreeStap';
import CommunityDateSelect from '@pages/CommunitySelect/stappage/CommunityDateSelectFourStap';
import CommunityIntroduce from '@pages/CommunitySelect/stappage/CommunityIntroduceFiveStap';
import CommunitySummary from '@pages/CommunitySelect/stappage/CommunitySummaryLastStap';
import {useNavigation} from '@react-navigation/native';
import useBackHandler from '@hooks/useBackHandler';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import ConfirmModal from '@components/common/modals/ConfirmModal';

const totalStep = 6;

interface CommunitySelectLayOutProps {
  label: any;
  currentStep?: any;
  goToNext?: any;
  children: any;
}

const CommunitySelectLayOut = ({label}: CommunitySelectLayOutProps) => {
  const methods = useForm({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    reValidateMode: 'onSubmit',
  });
  const {getValues} = methods;
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const {goBack} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useBackHandler(() => {
    if (currentStep > 1) {
      goToPrevious();
    } else {
      setIsConfirmModalVisible(true);
    }

    return true;
  });

  const goToNext = () => {
    if (currentStep < totalStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isButtonDisabled = () => {
    const values = getValues();

    switch (currentStep) {
      case 1:
        return !values.artTitle;
      case 2:
        return !values.artDays;
      case 3:
        return !values.artTime;
      case 5:
        return !values.communityContext;
      case 6:
        return !values.communityContext;
      default:
        return false;
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <View style={styles.container}>
          <View style={styles.searchInputArea}>
            <StepHeader
              label={headerLabels[currentStep - 1]}
              onPressCancel={() => setIsConfirmModalVisible(true)}
            />
          </View>
          <View style={styles.content}>
            {currentStep === 1 && <CommunitySelect />}
            {currentStep === 2 && <ArtDaysTwoStap />}
            {currentStep === 3 && <ArtTimesThreeStap />}
            {currentStep === 4 && <CommunityDateSelect />}
            {currentStep === 5 && <CommunityIntroduce />}
            {currentStep === 6 && <CommunitySummary />}
          </View>
        </View>
        <MultiStepFormBottom
          currentStep={currentStep}
          maxStep={totalStep}
          onPressNextButton={methods.handleSubmit(goToNext)}
          onPressPrevButton={goToPrevious}
          disabled={isButtonDisabled()}
        />
      </FormProvider>
      <ConfirmModal
        message={'작성중이던 모든 내용이 사라집니다.\n정말 나가시겠습니까?'}
        isVisible={isConfirmModalVisible}
        onConfirm={() => goBack()}
        onCancel={() => setIsConfirmModalVisible(false)}
      />
    </>
  );
};

const headerLabels = [
  '함께 볼 공연을 선택해주세요',
  '공연날짜를 선택해주세요',
  '공연시간을 선택해주세요',
  '모임시간을 선택해주세요',
  '모임의 정보를 작성해주세요',
  '최종확인',
];

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
});

export default CommunitySelectLayOut;
