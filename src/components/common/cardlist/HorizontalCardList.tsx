import {colors} from '@styles/color';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import SearchCardItem from '@components/search/SearchCardItem';
import CommunityCardItem from '@components/community/CommunityCardItem';
import {BOTTOM_TAB_HEIGHT} from '@styles/common';

export interface CommonArtCardListProps {
  data: any;
  type: string;
}

const HorizontalCardList = ({data, type}: CommonArtCardListProps) => {
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: BOTTOM_TAB_HEIGHT, flexGrow: 1}}
      data={data}
      renderItem={item =>
        type == 'search' ? (
          <SearchCardItem data={item} />
        ) : (
          <CommunityCardItem data={item} />
        )
      }
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
    />
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
