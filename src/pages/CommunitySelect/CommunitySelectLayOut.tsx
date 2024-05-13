import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
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
import {createMeeting, getMeeting, updateMeeting} from '@apis/supabase/meeting';
import ConfirmModal from '@components/common/modals/ConfirmModal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import useBackHandler from '@hooks/useBackHandler';
import {getPerformanceDetail} from '@apis/kopis';
import Config from 'react-native-config';
import dayjs from 'dayjs';

interface CommunitySelectLayOutProps
  extends NativeStackScreenProps<RootStackParamList, 'CommunitySelectLayOut'> {}

const CommunitySelectLayOut = ({
  navigation: {goBack, replace},
  route: {params},
}: CommunitySelectLayOutProps) => {
  const methods = useForm<CommunityForm>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    reValidateMode: 'onSubmit',
  });
  const {getValues, setValue} = methods;

  const [mode, setMode] = useState<CommunityEditorMode>('SAVE');
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const totalStep = 6;

  useEffect(() => {
    if (!params) return;
    if ('artId' in params) {
      initiateForSaveFromPerffDetail(params.artId);
      return;
    }
    if ('meetingId' in params) {
      initiateForEdit(params.meetingId);
      return;
    }

    async function initiateForSaveFromPerffDetail(artId: string) {
      const {genrenm, poster, prfnm} = await getPerformanceDetail({
        performanceId: artId,
      });
      setValue('artId', artId);
      setValue('artGenre', genrenm);
      setValue('artPhotoUrl', poster.replace(Config.KOPIS_IMAGE_BASE_URL, ''));
      setValue('artTitle', prfnm);

      setMode('SAVE_FROM_STEP_TWO');
      setCurrentStep(2);
    }

    async function initiateForEdit(meetingId: number) {
      const {
        max_occupancy,
        introduction,
        meeting_at,
        perf_at,
        perf_genre,
        perf_id,
        perf_name,
        perf_image_url,
        title,
      } = await getMeeting(meetingId);
      const perfAt = dayjs(perf_at);

      setValue('artDay', perfAt.format('YYYY년 MM월 DD일'));
      setValue('artDays', perfAt.format('YYYY-MM-DD'));
      setValue('artGenre', perf_genre);
      setValue('artId', perf_id);
      setValue('artPhotoUrl', perf_image_url);
      setValue('artTime', perfAt.format('HH:mm'));
      setValue('artTitle', perf_name);
      setValue('communityContext', introduction);
      setValue('communityDate', meeting_at);
      setValue('communityName', title);
      setValue('communityParticipant', max_occupancy);
      setMode('EDIT');
      setCurrentStep(2);
    }
  }, [params]);

  useBackHandler(() => {
    setIsConfirmModalVisible(true);
    return true;
  });

  const goToNext = async () => {
    if (currentStep < totalStep) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const datas = getValues();
        const date = dayjs(`${datas.artDays} ${datas.artTime}`);
        const artdateisoString = date.toISOString();

        const meetingParams = {
          introduction: datas.communityContext,
          max_occupancy: datas.communityParticipant,
          title: datas.communityName,
          perf_id: datas.artId,
          perf_name: datas.artTitle,
          perf_genre: datas.artGenre,
          perf_image_url: datas.artPhotoUrl,
          meeting_at: datas.communityDate,
          perf_at: artdateisoString,
        };

        let meetingId: number;
        if (mode === 'SAVE' || mode === 'SAVE_FROM_STEP_TWO') {
          meetingId = await createMeeting(meetingParams);
        } else if (params && 'meetingId' in params) {
          meetingId = params.meetingId;
          await updateMeeting(params.meetingId, meetingParams);
        }
        replace('CommunityDetail', {id: meetingId!});
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goToPrevious = () => {
    if (mode === 'SAVE') {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    } else {
      if (currentStep > 2) {
        setCurrentStep(currentStep - 1);
      }
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
              label={
                (currentStep == 1 && '함께 볼 공연을 선택해주세요') ||
                (currentStep == 2 && '함께 볼 공연 날짜를 알려주세요') ||
                (currentStep == 3 && '함께 볼 공연 시간을 알려주세요') ||
                (currentStep == 4 && '함께 모일 일정을 정해주세요') ||
                (currentStep == 5 && '모임의 상세정보를 알려주세요') ||
                (currentStep == 6 && '모임을 확인해주세요')
              }
              icon={currentStep == 1 && 'search1'}
              onPressCancel={() => setIsConfirmModalVisible(true)}
            />
          </View>
          <View style={styles.content}>
            {currentStep == 1 && <CommunityFirstStep />}
            {currentStep == 2 && <CommunityTwoStep />}
            {currentStep == 3 && <CommunityThreeStep />}
            {currentStep == 4 && <CommunityFourStep />}
            {currentStep == 5 && <CommunityFiveStep />}
            {currentStep == 6 && <CommunityLastStep />}
          </View>
        </View>
        <MultiStepFormBottom
          mode={mode}
          currentStep={currentStep}
          maxStep={6}
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

export interface CommunityForm {
  artDay: string;
  artDays: string;
  artGenre: string;
  artId: string;
  artPhotoUrl?: string;
  artTime: string;
  artTitle: string;
  communityContext: string;
  communityDate: string;
  communityName: string;
  communityParticipant: number;
}

export interface CommunityEditForm extends CommunityForm {
  meetingId: number;
}

export type CommunityEditorMode = 'SAVE' | 'SAVE_FROM_STEP_TWO' | 'EDIT';

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
