import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
//import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';
import CommonButton from '../../atoms/buttons/CommonButton';
const AfterTicketingModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LottieView
              source={require('@lotties/ticket.json')}
              style={{width: 150, height: 150}}
              autoPlay
              loop
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: colors.Black,
                textAlign: 'center',
                paddingBottom: 24,
              }}>
              예매를 완료하셨습니까?{'\n'}
              완료하셨다면 정보를{'\n'}
              등록해주세요
            </Text>
            <View style={{paddingBottom: 10, width: 300}}>
              <CommonButton
                label="등록하러 가기"
                onPress={console.log('등록페이지로 이동')}
              />
            </View>
            <Pressable
              style={{
                width: 300,
                backgroundColor: colors.GRAY_300,
                paddingHorizontal: 24,
                paddingVertical: 18,
                borderRadius: 32,
                margin: 2,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>아니요</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 35,
    width: 374,
    height: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AfterTicketingModal;
