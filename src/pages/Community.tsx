import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityTemplates from '../template/Community/CommunityTemplates';
import CommunityIntroduce from './CommunitySelect/CommunityIntroduce';
import CommunitySummary from './CommunitySelect/CommunitySummary';

interface CommunityProps {}

const Community = ({}: CommunityProps) => {
  return <CommunityTemplates></CommunityTemplates>;
};

const styles = StyleSheet.create({});

export default Community;
