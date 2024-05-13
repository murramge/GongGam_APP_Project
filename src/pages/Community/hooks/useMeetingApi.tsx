import {useCallback, useEffect, useState} from 'react';
import {getMeetings, getMeetingsParams} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {MeetingInfo} from '@apis/supabase/meeting.d';

//미팅 api 불러옴

export const CommunityDataAtom = atom<MeetingInfo[]>([]);
const CommunityDataPageAtom = atom<number>(0);

const useMettingApi = ({
  selectedType,
  query,
}: {
  selectedType: 'All' | 'Query';
  query?: getMeetingsParams;
}) => {
  const [meetings, setMeetings] = useAtom(CommunityDataAtom);
  const [currentPage, setCurrentPage] = useAtom(CommunityDataPageAtom);

  const fetchMeetings = useCallback(async () => {
    try {
      const data = await getMeetings({page: currentPage + 1});
      setMeetings(prevMeetings => [...prevMeetings, ...data]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  const refreshMeetings = useCallback(async () => {
    try {
      const firstPage = 1;
      const data = await getMeetings({page: firstPage});
      setMeetings(data);
      setCurrentPage(firstPage);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {meetings, fetchMeetings, refreshMeetings};
};

export default useMettingApi;
