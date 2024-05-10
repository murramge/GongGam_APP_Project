import {useEffect, useState} from 'react';
import {getMeetings} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {getProfile} from '@react-native-seoul/kakao-login';
import {supabase} from '@apis/supabase/supabase';

//프로필 api 불러옴

export const ProfileDataAtom = atom([]);
const useProfileApi = () => {
  const [profile, setProfile] = useAtom(ProfileDataAtom);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        console.log(await supabase.auth.getSession());
        const data = await getProfile();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  return profile;
};

export default useProfileApi;
