import {useEffect, useState} from 'react';
import {getMeetings, getMeetingsParams} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {MeetingInfo} from '@apis/supabase/meeting.d';

//미팅 api 불러옴

export const CommunityDataAtom = atom<MeetingInfo[]>([]);

const useMettingApi = ({
  selectedType,
  query,
}: {
  selectedType: 'All' | 'Query';
  query?: getMeetingsParams;
}) => {
  const [meetings, setMeetings] = useAtom(CommunityDataAtom);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // "All" 탭일 경우 모든 미팅을 가져옵니다.
        // 추후 "추천" 탭에 대한 로직도 추가할 수 있습니다.
        if (selectedType === 'All') {
          const data = await getMeetings({});
          setMeetings(data);
        } else if (selectedType === 'Query' && query) {
          const data = await getMeetings(query);
          setMeetings(data);
        } else {
          setMeetings([]); // 임시적으로 비어 있는 배열 설정
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeetings();
  }, [selectedType]);

  return meetings;
};

export default useMettingApi;
