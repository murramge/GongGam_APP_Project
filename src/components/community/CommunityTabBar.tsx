import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {colors} from '@styles/color';
import useMettingApi from '../../pages/Community/hooks/useMettingApi';
import useTabSelection from '../../pages/Community/hooks/useTabSelection';

const CommunityTabBar = () => {
  const [selectedTab, selectTab] = useTabSelection('All');
  useMettingApi({selectedType: 'All'});

  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <TouchableOpacity
        style={{
          padding: 10,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            selectedTab === 'All' ? colors.MAIN_COLOR : colors.GRAY_200,
        }}
        onPress={() => selectTab('All')}>
        <Text
          style={{
            color: selectedTab === 'All' ? colors.WHITE : colors.BLACK,
            fontWeight: '700',
          }}>
          전체
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            selectedTab === '추천' ? colors.MAIN_COLOR : colors.GRAY_200,
        }}
        onPress={() => selectTab('추천')}>
        <Text
          style={{
            color: selectedTab === '추천' ? colors.WHITE : colors.BLACK,
            fontWeight: '700',
          }}>
          추천
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityTabBar;
