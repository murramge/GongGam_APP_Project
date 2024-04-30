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
