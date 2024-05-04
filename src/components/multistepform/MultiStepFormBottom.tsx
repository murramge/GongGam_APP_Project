import React from 'react';
import {View} from 'react-native';
import GrayButton from '../../atoms/buttons/GrayButton';
import CommonButton from '../../atoms/buttons/CommonButton';
import {colors} from '@styles/color';

interface MultiStepFormBottomProps extends StepIndicatorProps {
  onPressNextButton?: () => void;
  onPressPrevButton?: () => void;
  disabled?: any;
}
const MultiStepFormBottom = ({
  currentStep,
  maxStep,
  onPressNextButton,
  onPressPrevButton,
  disabled,
}: MultiStepFormBottomProps) => {
  const isFirst = currentStep === 1;
  const isFinal = maxStep === currentStep;
  return (
    <View style={{padding: 16, gap: 8}}>
      <StepIndicator currentStep={currentStep} maxStep={maxStep} />
      <View style={{flexDirection: 'row', gap: 8}}>
        {!isFirst && (
          <View style={{flex: 1}}>
            <GrayButton label="이전" onPress={onPressPrevButton} />
          </View>
        )}
        <View style={{flex: 2}}>
          <CommonButton
            label={isFinal ? '모임 만들기' : '다음'}
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
        height: 6,
        gap: 2,
        flexDirection: 'row',
      }}>
      {completedStep.map(_ => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.MAIN_COLOR,
          }}
        />
      ))}
      {remainStep.map(_ => (
        <View style={{flex: 1, backgroundColor: colors.GRAY_200}} />
      ))}
    </View>
  );
};

export default MultiStepFormBottom;
