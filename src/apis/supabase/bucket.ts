import {supabase} from './supabase';
import {v4 as uuid} from 'uuid';
import FileSystem from 'react-native-fs';
import {decode} from 'base64-arraybuffer';

interface UploadFileProps {
  userId: string;
  filePath: string;
  mime: string;
  type: 'profile' | 'review';
}

export const uploadFile = async ({
  userId,
  filePath,
  type,
  mime,
}: UploadFileProps) => {
  const uploadPath = `${userId}/${type}/${uuid()}`;
  try {
    const fileBase64 = await FileSystem.readFile(filePath, 'base64');
    const {error} = await supabase.storage
      .from('image')
      .upload(uploadPath, decode(fileBase64), {
        contentType: mime,
      });

    if (error) {
      console.error(`Error uploading file: ${error.message}`);
      throw new Error(`Error uploading file: ${error.message}`);
    }
    return uploadPath;
  } catch (e) {
    throw e;
  }
};
const baseUrl =
  'https://nevgphppzzhbdcqetahi.supabase.co/storage/v1/object/public/images/';
