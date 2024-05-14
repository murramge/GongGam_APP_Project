import MyPageHeader from '@components/mypage/MyPageEditHeader';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {colors} from '@styles/color';
import useImage from '@hooks/useImage';
import {uploadFile} from '@apis/supabase/bucket';
import Toast from 'react-native-toast-message';
import InputLabel from '@components/common/label/InputLabel';
import {Controller, useForm} from 'react-hook-form';
import {ProfileSchema, ProfileSchemaType} from '@utils/validation';
import {zodResolver} from '@hookform/resolvers/zod';
import {getCurrentAuthUser} from '@apis/supabase/auth';
import {updateProfile} from '@apis/supabase/profile';
import useProfileApi from './hooks/useProfileApi';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';

interface ProfileEditProps {}

const ProfileEdit = ({}: ProfileEditProps) => {
  const {profile, user} = useProfileApi();
  const {goBack} =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'ProfileEdit'>
    >();
  const {
    error: imageSelectError,
    openPicker,
    selectedImage,
  } = useImage({
    required: false,
  });
  const {handleSubmit, control, trigger, setValue} = useForm<ProfileSchemaType>(
    {
      defaultValues: {
        nickname: profile?.nickname,
      },
      resolver: zodResolver(ProfileSchema),
    },
  );

  useEffect(() => {
    setValue('nickname', profile?.nickname ?? '');
  }, [profile]);

  useEffect(() => {
    imageSelectError && Toast.show({text1: imageSelectError, type: 'error'});
  }, [imageSelectError]);

  const onSubmit = async (formData: {nickname: string}) => {
    try {
      let imageUrl;
      if (selectedImage && (await trigger())) {
        const {mime, path} = selectedImage;
        const user = await getCurrentAuthUser();
        if (!user) throw Error('세션이 만료되었습니다.');

        imageUrl = await uploadFile({
          mime,
          filePath: path,
          type: 'profile',
          userId: user.id,
        });
      }

      await updateProfile({
        image_url: imageUrl,
        nickname: formData.nickname,
      });
      Toast.show({text1: '프로필이 수정되었습니다.', type: 'success'});
      goBack();
    } catch (e) {
      Toast.show({
        text1: '프로필을 수정하는 도중 에러가 발생했습니다.',
        type: 'error',
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: 'space-around',
      }}>
      <View>
        <MyPageHeader
          profileImageUrl={
            selectedImage
              ? selectedImage.path
              : profile?.image_url
              ? `${Config.SUPABASE_PUBLIC_IMAGE_BASE_URL}/${profile?.image_url}`
              : undefined
          }
          onPressCameraButton={() => openPicker()}
        />
      </View>
      <View style={{padding: 10}}>
        <Controller
          control={control}
          name="nickname"
          rules={{minLength: 4}}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <View>
              <InputLabel label="닉네임" errorMessage={error?.message} />
              <SignInput
                label="(기존닉네임)"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />

        <InputLabel label="이메일" />
        <SignInput
          label="(기존이메일)"
          value={user?.email ?? ''}
          onChangeText={text => console.log(text)}
          type="editable"
        />
      </View>
      <View>
        <CommonButton label="완료" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileEdit;
