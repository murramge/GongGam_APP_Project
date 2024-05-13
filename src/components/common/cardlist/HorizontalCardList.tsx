import {colors} from '@styles/color';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import SearchCardItem from '@components/search/SearchCardItem';
import CommunityCardItem from '@components/community/CommunityCardItem';
import {BOTTOM_TAB_HEIGHT} from '@styles/common';
import useMettingApi from '@pages/Community/hooks/useMeetingApi';
import {MeetingInfo} from '@apis/supabase/meeting.d';

export interface CommonArtCardListProps {
  data: MeetingInfo[];
  type: string;
}

const HorizontalCardList = ({data, type}: CommonArtCardListProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const {fetchMeetings, refreshMeetings} = useMettingApi({selectedType: 'All'});

  useEffect(() => {
    fetchMeetings();
  }, []);
  data.map(item => console.log(item.id));
  //console.log('data.id:', data.id);
  return (
    data.length !== 0 && (
      <FlatList
        onEndReached={async () => {
          await fetchMeetings();
        }}
        onRefresh={async () => {
          setRefreshing(true);
          await refreshMeetings();
          setRefreshing(false);
        }}
        refreshing={refreshing}
        contentContainerStyle={{paddingBottom: BOTTOM_TAB_HEIGHT, flexGrow: 1}}
        data={data}
        renderItem={item =>
          type == 'search' ? (
            <SearchCardItem data={item} />
          ) : (
            <CommunityCardItem data={item} />
          )
        }
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
      />
    )
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    marginLeft: 5,
  },
  separator: {
    width: 8,
  },
});

export default HorizontalCardList;
