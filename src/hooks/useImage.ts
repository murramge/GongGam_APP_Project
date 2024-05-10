import {hasCameraAndMediaFileAccess} from '@utils/permissions';
import {useState} from 'react';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';

const mimeType = ['image/jpeg', 'image/png'];
const maxFileSize = 5; //MB

const useImage = ({required = false}: {required?: boolean}) => {
  const [selectedImage, setSelectedImage] = useState<Image>();
  const [error, setError] = useState<string>();

  const openPicker = async () => {
    try {
      if (!(await hasCameraAndMediaFileAccess())) return;

      const pickedImage = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });

      validate(pickedImage);
      setSelectedImage(pickedImage);
    } catch (e: any) {
      if (!e.message.includes('User cancelled image selection')) {
        setError('이미지 선택 중 오류가 발생했습니다.');
      }
    }
  };

  const validate = (image?: Image) => {
    if (required && !image) {
      setError('이미지를 선택해주세요.');
      return false;
    }

    if (image) {
      const mbSize = image.size / (1024 * 1024);
      if (mbSize > maxFileSize) {
        setError('사진의 크기가 너무 큽니다. (5MB 이하)');
        return false;
      }
      if (!mimeType.includes(image.mime)) {
        setError('지원되는 형식: JPEG, PNG');
        return false;
      }
    }

    setError(undefined);
    return true;
  };

  const trigger = () => validate(selectedImage);

  return {selectedImage, openPicker, error, trigger};
};

export default useImage;
