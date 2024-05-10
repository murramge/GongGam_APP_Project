import {useEffect, useState} from 'react';
import {getMeetings} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {supabase} from '@apis/supabase/supabase';

import {UserProfile} from '@apis/supabase/profile.d';
import {getCurrentAuthUser} from '@apis/supabase/auth';
import {User} from '@supabase/supabase-js';
import {getProfile} from '@apis/supabase/profile';

//프로필 api 불러옴

export const ProfileDataAtom = atom<UserProfile | undefined>(undefined);

const useProfileApi = () => {
  const [profile, setProfile] = useAtom(ProfileDataAtom);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchProfiles();
  }, []);
  const fetchProfiles = async () => {
    try {
      setProfile(await getProfile());
      setUser(await getCurrentAuthUser());
    } catch (error) {
      console.error(error);
    }
  };

  return {profile, user, fetchProfiles};
};

export default useProfileApi;
