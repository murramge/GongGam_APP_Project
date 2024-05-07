import {colors} from '@styles/color';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import useBackHandler from '../../../hooks/useBackHandler';

interface AlramModalProps {
  isVisible: boolean;
  content: string;
  onPressConfirm: () => void;
}

const AlramModal = ({isVisible, content, onPressConfirm}: AlramModalProps) => {
  useBackHandler(() => false);

  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center'}}
      isVisible={isVisible}>
      <View
        style={{
          width: '70%',
          backgroundColor: colors.WHITE,
          borderRadius: 8,
          gap: 8,
          padding: 16,
        }}>
        <Text style={{color: colors.GRAY_600}}>{content}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={onPressConfirm}>
            <Text
              style={{
                color: colors.MAIN_COLOR,
                fontWeight: '700',
                fontSize: 15,
              }}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlramModal;
