import {Alert} from 'react-native';
import {supabase} from './supabase';
import type {EmailCredentials, EmailSignUp} from './auth.d';

export const emailSignIn = async ({email, password}: EmailCredentials) => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const emailSignUp = async ({email, password, nickname}: EmailSignUp) => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const checkEmailDuplication = async (email: string) => {
  try {
    const {data, error} = await supabase.rpc('check_email_existence', {
      new_email: email,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data as boolean;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const checkNicknameDuplication = async (nickname: string) => {
  try {
    const {data, error} = await supabase.rpc('check_email_existence', {
      new_nickname: nickname,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data as boolean;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const sendResetLink = async () => {
  try {
    const {data, error} = await supabase.auth.resetPasswordForEmail(
      'example@email.com',
    );
    if (error) {
      throw new Error(error.message);
    } else {
      Alert.alert('Password reset link sent successfully!');
    }
  } catch (e) {
    console.error('Error sending password reset link:', e);
    throw e;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const {data, error} = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw new Error(error.message);
    } else {
      Alert.alert('Password updated successfully!');
    }
  } catch (e) {
    console.error('Error updating password:', e);
    throw e;
  }
};

export const sendResetLinkAndPromptNewPassword = async () => {
  try {
    await sendResetLink();
    Alert.prompt(
      'Enter new password',
      undefined,
      async (newPassword: string | null) => {
        if (newPassword) {
          await updatePassword(newPassword);
        } else {
          console.warn('No new password provided');
        }
      },
    );
  } catch (e) {
    console.error(
      'Error sending password reset link and prompting new password:',
      e,
    );
    throw e;
  }
};
