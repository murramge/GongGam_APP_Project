import {
  getJoinedMeetings,
  getMeeting,
  getMeetings,
  joinMeeting,
} from '@apis/supabase/meeting';
import {supabase} from '@apis/supabase/supabase';

beforeEach(async () => {
  const {error} = await supabase.auth.signInWithPassword({
    email: 'admin@test.com',
    password: '1q2w3e4R!',
  });
  expect(error).toBe(null);
});

test('모든 모임 조회', async () => {
  const data = await getMeetings();
  expect(data.length > 0).toBe(true);
});

test('모임 상세 조회', async () => {
  const id = 20;
  const data = await getMeeting(id);
  expect(data.id).toBe(id);
});

test('참가한 모임 조회', async () => {
  const data = await getJoinedMeetings();
  expect(data.length).toBe(5);
});

test('모임 참여', async () => {
  await expect(async () => {
    await joinMeeting(22);
  }).rejects.toThrow('이미 참여중인 모임입니다.');
  await expect(async () => {
    await joinMeeting(23);
  }).rejects.toThrow('이미 참여중인 모임입니다.');
  await expect(async () => {
    await joinMeeting(24);
  }).rejects.toThrow('인원이 다 찼습니다.');
});

// test('모임 셍성', async () => {
//   await createMeeting({
//     introduction: '4분 모십니다 ㅎㅎ',
//     max_occupancy: 4,
//     performance_id: 'PF240002',
//     performance_name: '프랑켄슈타인',
//     title: '프랑켄슈타인 보러 가실분',
//   });
// });
