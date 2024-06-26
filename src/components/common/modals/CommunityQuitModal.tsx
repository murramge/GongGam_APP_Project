import {colors} from '@styles/color';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import CommunityWithdrawModal from '@components/common/modals/CommunityWithdrawModal';
interface CommunityQuitModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  title?: string;
  isOwner?: boolean;
  id?: any;
  onPressEdit?: () => void;
}
const CommunityQuitModal: React.FC<CommunityQuitModalProps> = ({
  isVisible,
  setIsVisible,
  title,
  isOwner,
  onPressEdit,
  id,
}) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | string>(null);
  const onPressWithdrawCancel = () => {
    setIsWithdrawModalOpen(false);
  };
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  return (
    <View>
      <Modal
        useNativeDriver
        isVisible={isVisible}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        backdropColor="#000"
        backdropOpacity={0.4}
        style={{
          flex: 1,
          margin: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        onBackButtonPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        hideModalContentWhileAnimating>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //os별로 다르게 준다
          keyboardVerticalOffset={8}
          style={{width: '100%'}}>
          <View
            style={{
              paddingTop: 20,
              width: SCREEN_WIDTH,
              height: 200,
              backgroundColor: '#FFF',
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
            }}>
            <View style={styles.menuContainer}>
              {isOwner ? (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMenuItem('leave');
                    setIsWithdrawModalOpen(true);
                    setIsVisible(!isVisible);
                  }}
                  style={[
                    styles.menuItem,
                    //selectedMenuItem === 'leave' ? styles.selectedMenuItem : null,
                  ]}>
                  <Text style={styles.menuText}>모임 삭제</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMenuItem('leave');
                    setIsWithdrawModalOpen(true);
                    setIsVisible(!isVisible);
                  }}
                  style={[
                    styles.menuItem,
                    //selectedMenuItem === 'leave' ? styles.selectedMenuItem : null,
                  ]}>
                  <Text style={styles.menuText}>모임 탈퇴</Text>
                </TouchableOpacity>
              )}

              {isOwner && (
                <TouchableOpacity onPress={onPressEdit}>
                  <Text style={styles.menuText}>모임 수정</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(!isVisible);
                }}
                style={[
                  styles.menuItem,
                  selectedMenuItem === 'close' ? styles.selectedMenuItem : null,
                ]}>
                <Text style={styles.menuText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <CommunityWithdrawModal
        isWithdrawModalOpen={isWithdrawModalOpen}
        onPressWithdrawCancel={onPressWithdrawCancel}
        title={title}
        id={id}
        isOwner={isOwner}
      />
    </View>
  );
};
export default CommunityQuitModal;
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    paddingVertical: 20,
  },
  menuText: {
    color: colors.BLACK,
    fontSize: 20,
    textAlign: 'center',
  },
  selectedMenuItem: {
    backgroundColor: colors.GRAY_100,
  },
});
