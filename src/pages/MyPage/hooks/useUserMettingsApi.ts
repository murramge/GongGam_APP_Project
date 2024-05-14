import {useEffect, useState} from 'react';
import {getJoinedMeetings} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {JoinedMeetingInfo} from '@apis/supabase/meeting.d';

//프로필 api 불러옴

export const ProfileDataAtom = atom<JoinedMeetingInfo[] | undefined>(undefined);

const useUserMettingsApi = () => {
  const [mymeetings, setMyMeetings] = useAtom(ProfileDataAtom);
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setMyMeetings(await getJoinedMeetings());
    } catch (error) {
      console.error(error);
    }
  };

  return {mymeetings};
};

export default useUserMettingsApi;
