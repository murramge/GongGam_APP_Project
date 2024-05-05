export interface CommentValue {
  content: string;
  meeting_id: number;
  reply_of?: number;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  reply_of: number;
  profile: {
    nickname: string;
    image_url?: string;
  };
}

export interface createMeetingCommentParams {
  meetingId: number;
  content: string;
  replyOf?: number;
}
