import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '@styles/color';

import CommunityTabBar from '@components/community/CommunityTabBar';
import {useAtomValue} from 'jotai';

import BackHeader from '@components/common/header/BackHeader';
import {CommunityDataAtom} from './hooks/useMettingApi';
import HorizontalCardList from '@components/common/cardlist/HorizontalCardList';
import CommunityCreate from '../../components/community/CommunityCreate';

const Community = () => {
  const results = useAtomValue(CommunityDataAtom);

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={{backgroundColor: '#F7F5F5'}}>
        <BackHeader label="함께 보기" icon="search"></BackHeader>
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
