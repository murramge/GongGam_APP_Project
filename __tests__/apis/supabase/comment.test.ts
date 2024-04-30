import {createMeetingComment, getMeetingComments} from '@apis/supabase/comment';
import {supabase} from '@apis/supabase/supabase';

beforeEach(async () => {
  const {error} = await supabase.auth.signInWithPassword({
    email: 'admin@test.com',
    password: '1q2w3e4R!',
  });
  expect(error).toBe(null);
});

test('코멘트 생성', async () => {
  await createMeetingComment({
    meetingId: 25,
    content: '몇시에 보는 건가요?',
  });
});

test('Reply 코멘트 생성', async () => {
  await createMeetingComment({
    meetingId: 25,
    content: '몇시에 보는 건가요?',
    replyOf: 8,
  });
});

test('모임 코멘트 조회', async () => {
  const comments = await getMeetingComments(25);
  console.log(comments[0].user_profile);
});
