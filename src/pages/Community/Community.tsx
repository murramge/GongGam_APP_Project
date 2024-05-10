import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '@styles/color';

import CommunityTabBar from '@components/community/CommunityTabBar';
import {useAtomValue} from 'jotai';

import {CommunityDataAtom} from './hooks/useMettingApi';
import HorizontalCardList from '@components/common/cardlist/HorizontalCardList';
import CommunityCreate from '../../components/community/CommunityCreate';
import TitleHeader from '@components/common/header/TitleHeader';
import BackHeader from '@components/common/header/BackHeader';

const Community = () => {
  const results = useAtomValue(CommunityDataAtom);

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={{backgroundColor: '#F7F5F5'}}>
        <TitleHeader label="함께 보기"></TitleHeader>
      </View>
      <View>
        <CommunityTabBar></CommunityTabBar>
      </View>
      <View>
        <CommunityCreate></CommunityCreate>
      </View>
      <HorizontalCardList
        data={results.map(item => {
          return item;
        })}
        type="community"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Community;
