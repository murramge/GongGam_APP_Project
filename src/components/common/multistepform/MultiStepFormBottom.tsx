import React from 'react';
import {View} from 'react-native';

import CommonButton from '../../../atoms/buttons/CommonButton';
import {colors} from '@styles/color';
import {CommunityEditorMode} from '@pages/CommunitySelect/CommunitySelectLayOut';

interface MultiStepFormBottomProps extends StepIndicatorProps {
  onPressNextButton?: () => void;
  onPressPrevButton?: () => void;
  disabled?: any;
  mode: CommunityEditorMode;
  currentStep: number;
  maxStep: number;
}
const MultiStepFormBottom = ({
  mode,
  currentStep,
  maxStep,
  onPressNextButton,
  onPressPrevButton,
  disabled,
}: MultiStepFormBottomProps) => {
  const isFirst = mode === 'SAVE' ? currentStep === 1 : currentStep === 2;
  const isFinal = maxStep === currentStep;

  return (
    <View style={{padding: 16, gap: 8, backgroundColor: colors.WHITE}}>
      <StepIndicator currentStep={currentStep} maxStep={maxStep} />
      <View style={{flexDirection: 'row', gap: 8}}>
        {!isFirst && (
          <View style={{flex: 1}}>
            <CommonButton
              label="이전"
              bgColor={colors.GRAY_300}
              onPress={onPressPrevButton}
            />
          </View>
        )}
        <View style={{flex: 2}}>
          <CommonButton
            label={
              isFinal
                ? mode === 'EDIT'
                  ? '모임 수정하기'
                  : '모임 만들기'
                : '다음'
            }
            onPress={onPressNextButton}
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

interface StepIndicatorProps {
  currentStep: number;
  maxStep: number;
}
const StepIndicator = ({currentStep, maxStep}: StepIndicatorProps) => {
  const completedStep = new Array(currentStep).fill(null);
  const remainStep = new Array(maxStep - currentStep).fill(null);
  return (
    <View
      style={{
        width: '100%',
        height: 1.5,
        gap: 2,
        flexDirection: 'row',
      }}>
      {completedStep.map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            backgroundColor: colors.MAIN_COLOR,
          }}
        />
      ))}
      {remainStep.map((_, index) => (
        <View key={index} style={{flex: 1, backgroundColor: colors.GRAY_200}} />
      ))}
    </View>
  );
};

export default MultiStepFormBottom;
