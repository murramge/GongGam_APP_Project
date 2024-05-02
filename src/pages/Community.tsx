import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityTemplates from '../template/community/CommunityTemplates';
import CommunityIntroduce from './CommunityIntroduce';
interface CommunityProps {}

const Community = ({}: CommunityProps) => {
  //return <CommunityTemplates></CommunityTemplates>;
  return <CommunityIntroduce></CommunityIntroduce>;
};

const styles = StyleSheet.create({});

export default Community;
