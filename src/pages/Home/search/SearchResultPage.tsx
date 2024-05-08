import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RecentButton from '../../../atoms/buttons/RecentButton';
import {colors} from '@styles/color';
import SearchHeaderButton from '../../../components/common/button/SearchHeaderButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {AreaCode, GenreCode, PerformanceInfo} from '@apis/kopis.d';
import {getPerformanceList} from '@apis/kopis';
import moment from 'moment';
import HorizontalCardList from '@components/common/cardlist/HorizontalCardList';
import NotResult from '@components/common/cardlist/NotResult';

interface SearchResultPageProps
  extends NativeStackScreenProps<
    RootStackParamList,
    'PerformanceSearchResult'
  > {}

const SearchResultPage = ({route}: SearchResultPageProps) => {
  const {date, genreCode, signguCode, performanceName} = route.params;
  const [results, setResults] = useState<PerformanceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPerformanceList({
          page: 1,
          size: 1000,
          performanceName,
          startDate: date,
          endDate: date,
          genreCode: genreCode && GenreCode[genreCode],
          signguCode: signguCode && AreaCode[signguCode],
        });

        setResults(data);
      } catch (e) {
        setError('에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [route.params]);

  if (loading) return <ActivityIndicator />;

  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.searchInputArea}>
        <SearchHeaderButton></SearchHeaderButton>
        <ScrollView
          style={{marginBottom: 16, marginHorizontal: 16}}
          contentContainerStyle={{
            gap: 16,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {[
            performanceName && `검색어: ${performanceName}`,
            date && `일자: ${moment(date).format('YYYY년 MM월 DD일')}`,
            genreCode && `장르: ${genreCode}`,
            signguCode && `지역: ${signguCode}`,
          ].map(
            (label, index) =>
              label && <RecentButton key={index} label={label} />,
          )}
        </ScrollView>
      </View>
      <View style={styles.resultListContainer}>
        <Text style={styles.resultTotalText}>{results?.length}개의 결과</Text>
        {results.length === 0 ? (
          <NotResult />
        ) : (
          <HorizontalCardList
            data={results.map(item => {
              return item;
            })}
            type="search"
          />
        )}
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
    marginBottom: 5,
  },
});

export default SearchResultPage;
