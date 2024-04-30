import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RecentButton from '../../atoms/buttons/RecentButton';
import {colors} from '@styles/color';
import CancelButton from '../../atoms/buttons/CancelButton';
import SearchList from '@components/cardlist/SearchList';
import SearchHeaderButton from '../../atoms/buttons/SearchHeaderButton';

interface SearchResultPageProps {}

const SearchResultPage = ({}: SearchResultPageProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchInputArea}>
        <SearchHeaderButton></SearchHeaderButton>
        <View style={styles.recentWordArea}>
          <RecentButton label="검색어" />
        </View>
      </View>
      <View style={styles.resultListContainer}>
        <Text style={styles.resultTotalText}>13 개의 결과</Text>
        <SearchList date="20240425" stsType="day" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  searchInputArea: {
    backgroundColor: colors.SEARCH_BG,
  },
  recentWordArea: {
    flexDirection: 'row',
    marginLeft: 60,
    marginTop: 5,
    marginBottom: 20,
    gap: 8,
  },
  resultListContainer: {
    marginTop: 18,
    marginHorizontal: 27,
  },
  resultTotalText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

export default SearchResultPage;
