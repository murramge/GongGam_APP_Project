import {supabase} from './supabase';
import {UserProfile} from './profile.d';

export const getProfile = async () => {
  try {
    const {data, error} = await supabase
      .from('user_profile')
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserProfile;
  } catch (e) {
    throw e;
  }
};

export const updateProfile = async ({
  nickname,
  image_url,
}: {
  nickname?: string;
  image_url?: string;
}) => {
  try {
    const {data: userData, error: userError} = await supabase.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }

    const {error} = await supabase
      .from('user_profile')
      .update([
        {
          nickname,
          image_url,
        },
      ])
      .eq('user_id', userData.user.id);
    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};
