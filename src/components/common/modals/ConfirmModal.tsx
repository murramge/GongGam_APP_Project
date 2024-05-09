import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '@styles/color';

interface ConfirmModalProps {
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmModal = ({
  message,
  isVisible,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    gap: 16,
  },
  modalText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.MAIN_COLOR,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.GRAY_400,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ConfirmModal;
