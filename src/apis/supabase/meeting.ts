import {supabase} from './supabase';
import type {MeetingInfo, createMeetingParams} from './meeting.d';

export const getMeetings = async () => {
  try {
    const {data, error} = await supabase.rpc('get_meeting_info');

    if (error) {
      throw new Error(error.message);
    }

    return data as MeetingInfo[];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getMeeting = async (id: number) => {
  try {
    const {data, error} = await supabase
      .rpc('get_meeting_info', {
        param_id: id,
      })
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

    return data as MeetingInfo[];
  } catch (e) {
    console.error(e);
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

    return data.id;
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
    console.error(e);
    throw e;
  }
};
