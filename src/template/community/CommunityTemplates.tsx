import BackHeader from '@components/header/BackHeader';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '@styles/color';

import CommunityPlusButton from '@components/tapbar/CommunityPlusButton';
import CommunityTabBar, {
  CommunityDataAtom,
} from '@components/tapbar/CommunityTabBar';
import {useAtomValue} from 'jotai';
import CommonArtCardList from '@components/cardlist/CommonArtCardList';

interface CommunityTemplatesProps {}

const CommunityTemplates = ({}: CommunityTemplatesProps) => {
  const results = useAtomValue(CommunityDataAtom);

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={{backgroundColor: '#F7F5F5'}}>
        <BackHeader label="함께보기" icon="search"></BackHeader>
      </View>
      <View>
        <CommunityTabBar></CommunityTabBar>
      </View>
      <View>
        <CommunityPlusButton></CommunityPlusButton>
      </View>
      <CommonArtCardList
        data={results.map(item => {
          return item;
        })}
        type="community"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunityTemplates;
