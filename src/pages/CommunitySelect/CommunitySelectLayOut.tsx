import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StepHeader from '../../components/common/header/StepHeader';
import MultiStepFormBottom from '../../components/common/multistepform/MultiStepFormBottom';
import {FormProvider, useForm} from 'react-hook-form';
import CommunityFirstStep from '@pages/CommunitySelect/steppage/CommunityFirstStep';
import CommunityTwoStep from '@pages/CommunitySelect/steppage/CommunityTwoStep';
import CommunityThreeStep from '@pages/CommunitySelect/steppage/CommunityThreeStep';
import CommunityFourStep from '@pages/CommunitySelect/steppage/CommunityFourStep';
import CommunityFiveStep from '@pages/CommunitySelect/steppage/CommunityFiveStep';
import CommunityLastStep from '@pages/CommunitySelect/steppage/CommunityLastStep';
import {createMeeting} from '@apis/supabase/meeting';

const CommunitySelectLayOut = () => {
  const methods = useForm({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    reValidateMode: 'onSubmit',
  });
  const {getValues} = methods;
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedData, setSelectedData] = useState();
  const totalStep = 6;

  const goToNext = async () => {
    if (currentStep < totalStep) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const fetchdata = await createMeeting({...selectedData});
        console.log(fetchdata);
      } catch (error) {
        console.log(error);
      }
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
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.searchInputArea}>
          <StepHeader
            label={
              (currentStep == 1 && '함께 볼 공연을 선택해주세요') ||
              (currentStep == 2 && '함께 볼 공연 날짜를 알려주세요') ||
              (currentStep == 3 && '함께 볼 공연 시간을 알려주세요') ||
              (currentStep == 4 && '함께 모일 일정을 정해주세요') ||
              (currentStep == 5 && '모임의 상세정보를 알려주세요') ||
              (currentStep == 6 && '모임을 확인해주세요')
            }
            icon={currentStep == 1 && 'search1'}
          />
        </View>
        <View style={styles.content}>
          {currentStep == 1 && <CommunityFirstStep />}
          {currentStep == 2 && <CommunityTwoStep />}
          {currentStep == 3 && <CommunityThreeStep />}
          {currentStep == 4 && <CommunityFourStep />}
          {currentStep == 5 && <CommunityFiveStep />}
          {currentStep == 6 && (
            <CommunityLastStep setSelectedData={setSelectedData} />
          )}
        </View>
      </View>
      <MultiStepFormBottom
        currentStep={currentStep}
        maxStep={6}
        onPressNextButton={methods.handleSubmit(goToNext)}
        onPressPrevButton={goToPrevious}
        disabled={isButtonDisabled()}
      />
    </FormProvider>
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
});

export default CommunitySelectLayOut;
