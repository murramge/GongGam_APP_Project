import {colors} from '@styles/color';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import SearchCardItem from '@components/search/SearchCardItem';
import CommunityCardItem from '@components/community/CommunityCardItem';
import {BOTTOM_TAB_HEIGHT} from '@styles/common';
import useMeetingApi from '@pages/Community/hooks/useMeetingApi';
import {MeetingInfo} from '@apis/supabase/meeting.d';
import NotResult from './NotResult';

export interface CommonArtCardListProps {
  data: MeetingInfo[];
  type: string;
  id: number;
}

const HorizontalCardList = ({data, type, id}: CommonArtCardListProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const {fetchMeetings, refreshMeetings} = useMeetingApi({selectedType: 'All'});

  useEffect(() => {
    fetchMeetings();
  }, [id]);

  return (
    <View style={{flex: 1}}>
      {data.length !== 0 ? (
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
          contentContainerStyle={{
            paddingBottom: BOTTOM_TAB_HEIGHT,
          }}
          data={data}
          renderItem={item =>
            type == 'search' ? (
              <SearchCardItem data={item} />
            ) : (
              <CommunityCardItem data={item} />
            )
          }
          keyExtractor={item =>
            type === 'search' ? `${item.mt20id}` : `${item.id}`
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <></>
      )}
    </View>
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

export default memo(HorizontalCardList);
