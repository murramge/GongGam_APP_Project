import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityTemplates from '../template/community/CommunityTemplates';
import CommunityIntroduce from './communitySelect/CommunityIntroduce';
import CommunitySummary from './communitySelect/CommunitySummary';

interface CommunityProps {}

const Community = ({}: CommunityProps) => {
  //return <CommunityTemplates></CommunityTemplates>;
  return <CommunityIntroduce />;
  //return <CommunitySummary />;
};

const styles = StyleSheet.create({});

export default Community;
