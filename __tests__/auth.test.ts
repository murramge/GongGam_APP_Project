import {createClient} from '@supabase/supabase-js';
import Config from 'react-native-config';

const supabaseUrl = 'https://nevgphppzzhbdcqetahi.supabase.co';
const supabaseAnonKey = Config.SUPABASE_ANON_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw Error('need supabaseUrl or supabaseAnonKey');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

test('회원가입 테스트', async () => {
  const email = 'test1234@test.com';
  const password = '1q2w3e4R!';
  const nickname = 'test1234';
  const {error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  expect(error).toBe(null);
});

test('이메일 중복 테스트', async () => {
  const {data: data1} = await supabase.rpc('check_email_existence', {
    new_email: 'test@test.com',
  });
  const {data: data2} = await supabase.rpc('check_email_existence', {
    new_email: 'testz@testvxcv.com',
  });

  expect(data1).toBe(true);
  expect(data2).toBe(false);
});

test('닉네임 중복 테스트', async () => {
  const {data: data1} = await supabase.rpc('check_nickname_existence', {
    new_nickname: 'testing',
  });
  const {data: data2} = await supabase.rpc('check_nickname_existence', {
    new_nickname: 'testing',
  });

  expect(data1).toBe(true);
  expect(data2).toBe(true);
});
