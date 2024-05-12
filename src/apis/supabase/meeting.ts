import {supabase} from './supabase';
import type {
  JoinedMeetingInfo,
  MeetingInfo,
  createMeetingParams,
  updateMeetingParams,
} from './meeting.d';
import dayjs from 'dayjs';
import {PerformanceGenreKey} from '@apis/kopis.d';

export interface getMeetingsParams {
  perfName?: string;
  perfGenre?: PerformanceGenreKey;
  meetingAt?: string;
  maxOccupancy?: number;
  page?: number;
  size?: number;
}

export const getMeetings = async ({
  maxOccupancy,
  meetingAt,
  perfGenre,
  perfName,
  page = 1,
  size = 10,
}: getMeetingsParams) => {
  try {
    const startOfDate = dayjs(meetingAt).hour(0).minute(0).toISOString();
    const endOfDate = dayjs(meetingAt).hour(23).minute(59).toISOString();

    let query = supabase.from('meeting_with_current_occupancy').select('*');
    if (perfName) query = query.like('perf_name', `%${perfName}%`);
    if (perfGenre) query = query.like('perf_genre', `%${perfGenre}%`);
    if (maxOccupancy) query = query.eq('max_occupancy', maxOccupancy);
    if (meetingAt)
      query = query.gte('meeting_at', startOfDate).lte('meeting_at', endOfDate);

    const {data, error} = await query
      .range((page - 1) * size, page * size - 1)
      .order('id', {ascending: false});

    if (error) throw new Error(error.message);

    return data as MeetingInfo[];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getMeeting = async (id: number) => {
  try {
    const {data, error} = await supabase
      .from('meeting_with_current_occupancy')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as MeetingInfo;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getJoinedMeetings = async () => {
  try {
    const {data, error} = await supabase.rpc('get_joined_meetings');

    if (error) {
      throw new Error(error.message);
    }

    return data as JoinedMeetingInfo[];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateMeeting = async (
  meetingId: number,
  params: updateMeetingParams,
) => {
  try {
    const {error} = await supabase
      .from('meeting')
      .update([params])
      .eq('id', meetingId);

    if (error) throw new Error(error.message);
  } catch (e) {
    throw e;
  }
};

export const createMeeting = async (params: createMeetingParams) => {
  try {
    const {data, error: meetingError} = await supabase
      .from('meeting')
      .insert([
        {
          ...params,
        },
      ])
      .select()
      .single();

    if (meetingError) {
      throw new Error(meetingError.message);
    }

    return data.id as number;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const joinMeeting = async (meetingId: number) => {
  try {
    const {error} = await supabase.rpc('add_user_to_meeting', {
      param_meeting_id: meetingId,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};

export const quitMeeting = async (meetingId: number) => {
  try {
    const {error} = await supabase.rpc('remove_user_from_meeting', {
      param_meeting_id: meetingId,
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};
