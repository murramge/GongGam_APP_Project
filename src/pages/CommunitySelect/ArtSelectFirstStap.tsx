import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityList from '@components/cardlist/CommunityList';
import MyCommunityList from '@components/cardlist/MyCommunityList';
import CommunitySelectLayOut from '@components/CommunitySelectLayOut';
import {useFormContext} from 'react-hook-form';
import MultiStepFormBottom from '@components/multistepform/MultiStepFormBottom';
import {useNavigation} from '@react-navigation/native';

const CommunitySelect = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {navigate} = useNavigation();
  const {formState} = useFormContext();
  const {isValid, isDirty} = formState;
  const {setValue, watch} = useFormContext();

  return (
    <>
      <View style={styles.communityList}>
        <CommunityList
          date="20240425"
          stsType="day"
          setValue={setValue}
          watch={watch}></CommunityList>
        <MyCommunityList date="20240425" stsType="day"></MyCommunityList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  communityList: {
    flex: 0.65,
    marginHorizontal: 30,
  },
});

export default CommunitySelect;
