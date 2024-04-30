import {supabase} from './supabase';
import {v4 as uuid} from 'uuid';
import FileSystem from 'react-native-fs';
import {decode} from 'base64-arraybuffer';

type SaveLocation = 'profile' | 'meeting';

interface uploadFileProps {
  path: string;
  mime: string;
  saveLocation: SaveLocation;
}

export const uploadFile = async ({
  saveLocation,
  mime,
  path,
}: uploadFileProps) => {
  try {
    const baseUrl =
      'https://nevgphppzzhbdcqetahi.supabase.co/storage/v1/object/public/images/';
    const uploadPathName = `${saveLocation}/${uuid()}`;
    const uploadFileBase64 = await FileSystem.readFile(path, 'base64');

    const {error} = await supabase.storage
      .from('images')
      .upload(uploadPathName, decode(uploadFileBase64), {
        contentType: mime,
      });

    if (error) {
      throw new Error(error.message);
    }

    return `${baseUrl}${uploadPathName}`;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
