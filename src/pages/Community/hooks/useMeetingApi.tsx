import {useCallback} from 'react';
import {getMeetings, getMeetingsParams} from '@apis/supabase/meeting';
import {atom, useAtom} from 'jotai';
import {MeetingInfo} from '@apis/supabase/meeting.d';
import {PerformanceGenreKey} from '@apis/kopis.d';

//미팅 api 불러옴

export const CommunityDataAtom = atom<MeetingInfo[]>([]);
const CommunityDataPageAtom = atom<number>(0);
const perfNameAtom = atom<string | undefined>(undefined);
const perfGenreAtom = atom<PerformanceGenreKey | undefined>(undefined);
const meetingAtAtom = atom<string | undefined>(undefined);
const maxOccupancyAtom = atom<number | undefined>(undefined);

const useMeetingApi = ({
  selectedType,
  query,
}: {
  selectedType: 'All' | 'Query';
  query?: getMeetingsParams;
}) => {
  const [meetings, setMeetings] = useAtom(CommunityDataAtom);
  const [currentPage, setCurrentPage] = useAtom(CommunityDataPageAtom);
  const [perfName, setPerfName] = useAtom(perfNameAtom);
  const [perfGenre, setPerfGenre] = useAtom(perfGenreAtom);
  const [meetingAt, setMeetingAt] = useAtom(meetingAtAtom);
  const [maxOccupancy, setMaxOccupancy] = useAtom(maxOccupancyAtom);

  const fetchMeetings = async () => {
    try {
      const data = await getMeetings({
        maxOccupancy,
        meetingAt,
        perfGenre,
        perfName,
        page: currentPage + 1,
      });
      setMeetings(prevMeetings => [...prevMeetings, ...data]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshMeetings = async () => {
    try {
      const firstPage = 1;
      const data = await getMeetings({
        page: firstPage,
      });
      setMeetings(data);
      setCurrentPage(firstPage);
      setPerfName(undefined);
      setPerfGenre(undefined);
      setMeetingAt(undefined);
      setMaxOccupancy(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshFilteredMeetings = async () => {
    try {
      console.log(maxOccupancy, meetingAt, perfGenre, perfName);
      const firstPage = 1;
      const data = await getMeetings({
        maxOccupancy,
        meetingAt,
        perfGenre,
        perfName,
        page: firstPage,
      });
      setMeetings(data);
      setCurrentPage(firstPage);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    meetings,
    fetchMeetings,
    refreshMeetings,
    refreshFilteredMeetings,
    perfName,
    setPerfName,
    perfGenre,
    setPerfGenre,
    meetingAt,
    setMeetingAt,
    maxOccupancy,
    setMaxOccupancy,
  };
};

export default useMeetingApi;
