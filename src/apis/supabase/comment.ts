import {supabase} from './supabase';
import type {
  Comment,
  CommentValue,
  createMeetingCommentParams,
} from './comment.d';

export const getMeetingComments = async (meetingId: number) => {
  try {
    const {data, error} = await supabase
      .from('meeting_comment')
      .select(
        `
        id,
        content,
        created_at,
        user_profile(nickname,image_url)
        `,
      )
      .eq('meeting_id', meetingId);

    if (error) {
      throw new Error(error.message);
    }
    return data as Comment[];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createMeetingComment = async ({
  meetingId,
  content,
  replyOf,
}: createMeetingCommentParams) => {
  try {
    const value: CommentValue = {
      meeting_id: meetingId,
      content,
    };
    if (replyOf) {
      value.reply_of = replyOf;
    }

    const {error} = await supabase.from('meeting_comment').insert([value]);

    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
