// 모달을 불러오는 더미 페이지 입니다.
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityWithdrawModal from '@common/modals/CommunityWithdrawModal';
import CommunityJoinModal from '@common/modals/CommunityJoinModal';
import {Button} from 'react-native';
import {useState} from 'react';

const ModalTestPage = () => {
  // CommunityJoinModal 필요부분 시작
  const onPressJoinCancel = () => {
    setIsJoinModalOpen(false); // 모달을 닫음
  };
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const onPressWithdrawCancel = () => {
    setIsWithdrawModalOpen(false); // 모달을 닫음
  };
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  return (
    <View>
      <Button
        title="모임참여하기"
        onPress={() => {
          setIsJoinModalOpen(true);
        }}
      />
      <CommunityJoinModal
        isJoinModalOpen={isJoinModalOpen}
        onPressJoinCancel={onPressJoinCancel}
      />
      <Button
        title="모임탈퇴하기"
        onPress={() => {
          setIsWithdrawModalOpen(true);
        }}
      />
      <CommunityWithdrawModal
        isWithdrawModalOpen={isWithdrawModalOpen}
        onPressWithdrawCancel={onPressWithdrawCancel}
      />
    </View>
  );
};

export default ModalTestPage;
