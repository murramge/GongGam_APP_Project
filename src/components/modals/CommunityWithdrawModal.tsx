import React from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';

import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';
import CommonButton from '../../atoms/buttons/CommonButton';
import {atom, useAtom, useSetAtom} from 'jotai';
export const modalVisibleAtom = atom(false); //초기화

const CommunityWithdrawModal = () => {
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}></Modal>
    </View>
  );
};

export default CommunityWithdrawModal;
