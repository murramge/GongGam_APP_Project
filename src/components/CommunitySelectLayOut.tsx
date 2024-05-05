import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StepHeader from './header/StepHeader';
import MultiStepFormBottom from './multistepform/MultiStepFormBottom';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import CommunitySelect from '@pages/CommunitySelect/ArtSelectFirstStap';
import ArtDaysTwoStap from '@pages/CommunitySelect/ArtDaysTwoStap';
import ArtTimesThreeStap from '@pages/CommunitySelect/ArtTimesThreeStap';
import CommunityDateSelect from '@pages/CommunitySelect/CommunityDateSelectFourStap';
import CommunityIntroduce from '@pages/CommunitySelect/CommunityIntroduceFiveStap';
import CommunitySummary from '@pages/CommunitySelect/CommunitySummaryLastStap';

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
  const {handleSubmit, getValues, formState} = methods;
  const [currentStep, setCurrentStep] = useState(1);
  const totalStep = 6;

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
      default:
        return false;
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.searchInputArea}>
          <StepHeader
            label={currentStep == 1 && '함께 볼 공연을 선택해주세요'}
          />
        </View>
        <View style={styles.content}>
          {currentStep == 1 && <CommunitySelect></CommunitySelect>}
          {currentStep == 2 && <ArtDaysTwoStap></ArtDaysTwoStap>}
          {currentStep == 3 && <ArtTimesThreeStap></ArtTimesThreeStap>}
          {currentStep == 4 && <CommunityDateSelect></CommunityDateSelect>}
          {currentStep == 5 && <CommunityIntroduce></CommunityIntroduce>}
          {currentStep == 6 && <CommunitySummary></CommunitySummary>}
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
