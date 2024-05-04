import React from 'react';
import {StyleSheet, View} from 'react-native';

import CommunityTemplates from '../template/Community/CommunityTemplates';
import CommunityWithdrawModal from '@components/modals/CommunityWithdrawModal';
import CommunityJoinModal from '@components/modals/CommunityJoinModal';
import {Button} from 'react-native';
import {useState} from 'react';
import ModalTestPage from '@components/modals/ModalTestPage';
import CommunityTemplates from '../template/community/CommunityTemplates';
import CommunityIntroduce from './communitySelect/CommunityIntroduce';
import CommunitySummary from './communitySelect/CommunitySummary';


interface CommunityProps {}

const Community = ({}: CommunityProps) => {
  //return <CommunityTemplates></CommunityTemplates>;

  //return <CommunityWithdrawModal />;
  return <ModalTestPage />;
  // const onPressCancel = () => {
  //   setIsJoinModalOpen(false); // 모달을 닫음
  // };
  // const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  // return (
  //   <View>
  //     <Button
  //       title="모임참여하기"
  //       onPress={() => {
  //         setIsJoinModalOpen(true);
  //       }}
  //     />
  //     <CommunityJoinModal
  //       isJoinModalOpen={isJoinModalOpen}
  //       onPressCancel={onPressCancel}
  //     />
  //   </View>
  // );

  return <CommunityIntroduce />;

};

const styles = StyleSheet.create({});

export default Community;
