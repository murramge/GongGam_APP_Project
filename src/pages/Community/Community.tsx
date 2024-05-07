import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '@styles/color';

import CommunityTabBar from '@pages/Community/CommunityTabBar';
import {useAtomValue} from 'jotai';

import BackHeader from '@common/header/BackHeader';
import {CommunityDataAtom} from './hooks/useMettingApi';
import HorizontalCardList from '@common/cardlist/HorizontalCardList';
import CommunityCreate from './CommunityCreate';

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
