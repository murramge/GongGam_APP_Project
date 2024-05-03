import React, {useState} from 'react';
import {View, Text, Image, Modal, Pressable, StyleSheet} from 'react-native';
import {colors} from '@styles/color';
import CommonButton from '../../atoms/buttons/CommonButton';
import CommunityItem from '@components/carditem/CommunityItem';

const CommunityJoinModal = ({isJoinModalOpen}: {isJoinModalOpen: boolean}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isJoinModalOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CommunityItem
            // photoUrl={art.poster ?? undefined}
            // title={art.prfnm}
            // period={art.prfpd}
            // place={art.area}
            // id={art.mt20id}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.BLACK,
                lineHeight: 28,
                textAlign: 'center',
                paddingTop: 24,
                paddingBottom: 24,
              }}>
              선택한 모임에 참가하시겠습니까?{'\n'}
              아래 버튼을 누르면{'\n'}
              모임상세를 보실 수 있습니다.
            </Text>
            <View style={{paddingBottom: 10, width: 300}}>
              <CommonButton
                label="공연함께 보기 참가"
                onPress={() => console.log('모임참가')}
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
              //onPress={() => setModalVisible(false)}
              onPress={() => console.log('setModalVisible(false)')}>
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

export default CommunityJoinModal;
