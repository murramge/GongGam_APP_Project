import {MeetingInfo} from '@apis/supabase/meeting';
import {getMeetings} from '@apis/supabase/meeting';
import {colors} from '@styles/color';
import {atom, useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

interface CommunityTabBarProps {}

export const CommunityDataAtom = atom<MeetingInfo>([]);

const CommunityTabBar = ({}: CommunityTabBarProps) => {
  const [results, setResults] = useAtom<MeetingInfo>(CommunityDataAtom);
  const [selectcolor, setSelectcolor] = useState('all');

  useEffect(() => {
    const Datas = async () => {
      try {
        const data = await getMeetings();
        setResults(data);
      } catch (e) {
        console.log(e);
      }
    };
    Datas();
  }, []);

  const onTabType = async type => {
    switch (type) {
      case 'All':
        setSelectcolor('all');
        try {
          const data = await getMeetings();
          setResults(data);
        } catch (e) {
          console.log(e);
        }
        break;
      case '추천':
        setSelectcolor('recommend');
        //TODO : 추천에 맞는 api
        setResults([]);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <TouchableOpacity
        style={{
          padding: 10,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            selectcolor == 'all' ? colors.MAIN_COLOR : colors.GRAY_200,
        }}
        onPress={() => onTabType('All')}>
        <Text
          style={{
            color: selectcolor == 'all' ? colors.WHITE : colors.BLACK,
            fontWeight: '700',
          }}>
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            selectcolor == 'recommend' ? colors.MAIN_COLOR : colors.GRAY_200,
        }}
        onPress={() => onTabType('추천')}>
        <Text
          style={{
            color: selectcolor == 'recommend' ? colors.WHITE : colors.BLACK,
            fontWeight: '700',
          }}>
          추천
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunityTabBar;
