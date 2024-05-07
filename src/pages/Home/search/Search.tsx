import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, DateData} from 'react-native-calendars';
import {colors} from '@styles/color';
import CancelButton from '../../../atoms/buttons/CancelButton';
import CalendarButton from '../../../atoms/buttons/CalendarButton';
import SearchInput from '@common/input/SearchInput';
import useRecentSearch from './hooks/useRecentSearch';
import moment, {Moment} from 'moment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../router';
import {
  AreaCode,
  AreaCodeKey,
  GenreCode,
  PerformanceGenreKey,
} from '@apis/kopis.d';

interface PerformanceSearchProps
  extends NativeStackScreenProps<RootStackParamList, 'Search'> {}

const PerformanceSearch = ({navigation}: PerformanceSearchProps) => {
  const {
    recentSearchList,
    saveRecentSearch,
    fetchRecentSearches,
    removeRecentSearch,
  } = useRecentSearch('Performance');
  const [isDateSelectModalVisible, setIsDateSelectModalVisible] =
    useState(false);
  const [query, setQuery] = useState<string>('');
  const [date, setDate] = useState<Moment>();
  const [selectedGenre, setSelectedGenre] = useState<PerformanceGenreKey>();
  const [selectedArea, setSelectedArea] = useState<AreaCodeKey>();

  const onPressSearch = async () => {
    // 날짜가 선택되지 않았을 경우 오늘 날짜로 설정
    const searchDate = date || moment();

    if (query) {
      await saveRecentSearch(query);
      fetchRecentSearches();
    }

    navigation.navigate('PerformanceSearchResult', {
      date: searchDate.format('YYYYMMDD'),
      performanceName: query,
      genreCode: selectedGenre,
      signguCode: selectedArea,
    });

    if (!selectedArea || !selectedGenre) return;
  };

  const onPressCancelButtonQueryHistory = async (queryString: string) => {
    await removeRecentSearch(queryString);
    await fetchRecentSearches();
  };

  const onPressTextSearchQueryHistory = (text: string) => setQuery(text);
  const onPressAreaButton = (area: AreaCodeKey) => {
    if (area === selectedArea) {
      setSelectedArea(undefined);
    } else {
      setSelectedArea(area);
    }
  };
  const onPressGenreButton = (genre: PerformanceGenreKey) => {
    if (genre === selectedGenre) {
      setSelectedGenre(undefined);
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput
        type="back"
        value={query}
        onPressSearch={onPressSearch}
        onChangeText={setQuery}
      />
      <View>
        <View>
          <Text style={styles.searchTitle}>최근 검색어</Text>
          <View style={styles.recentArea}>
            {recentSearchList.length ? (
              recentSearchList.map(searchQueryString => (
                <CancelButton
                  key={searchQueryString}
                  label={searchQueryString}
                  onPressText={() =>
                    onPressTextSearchQueryHistory(searchQueryString)
                  }
                  onPressCancel={() =>
                    onPressCancelButtonQueryHistory(searchQueryString)
                  }
                />
              ))
            ) : (
              <Text
                style={{
                  backgroundColor: colors.SEARCH_BG,
                  padding: 3,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  fontSize: 13,
                  color: colors.GRAY_400,
                }}>
                최근 검색어가 없습니다.
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.searchTitle}>공연일 선택</Text>
          <CalendarButton
            label={date ? `${date.format('YYYY년 MM월 DD일')}` : '날짜 선택'}
            onPress={() => setIsDateSelectModalVisible(prevState => !prevState)}
          />
        </View>
        <View style={{marginHorizontal: 16, marginVertical: 5}}>
          <Text style={styles.searchTitle2}>장르 선택</Text>
          <Grid
            margin={16}
            numColumns={4}
            gap={10}
            data={
              Object.keys(GenreCode).filter(
                item => item !== '아동' && item !== '오픈런',
              ) as PerformanceGenreKey[]
            }
            renderItem={({item}) => (
              <TextButton
                text={item}
                onPress={() => onPressGenreButton(item)}
                isSelected={item === selectedGenre}
              />
            )}
          />
        </View>
        <View style={{marginHorizontal: 16, marginVertical: 5}}>
          <Text style={styles.searchTitle2}>지역 선택</Text>
          <Grid
            margin={16}
            numColumns={4}
            gap={10}
            data={Object.keys(AreaCode) as AreaCodeKey[]}
            renderItem={({item}) => (
              <TextButton
                text={item}
                onPress={() => onPressAreaButton(item)}
                isSelected={item === selectedArea}
              />
            )}
          />
        </View>
      </View>
      <DateSelectModal
        isVisible={isDateSelectModalVisible}
        onDayPress={date => {
          setIsDateSelectModalVisible(false);
          setDate(moment(date.dateString));
        }}
      />
    </View>
  );
};

interface DateSelectModal {
  isVisible?: boolean;
  onDayPress: (day: DateData) => void;
}

const DateSelectModal = ({isVisible = false, onDayPress}: DateSelectModal) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={() => {}}>
      <View
        style={{
          borderRadius: 16,
          padding: 16,
          gap: 16,
          backgroundColor: colors.WHITE,
        }}>
        <Calendar
          current={moment(new Date()).format('YYYY-MM-DD')}
          onDayPress={onDayPress}
        />
      </View>
    </Modal>
  );
};

interface GridProps<ItemT> {
  gap: number;
  margin: number;
  numColumns: number;
  data: ItemT[];
  renderItem: ({
    item,
    index,
  }: {
    item: ItemT;
    index: number;
  }) => React.JSX.Element;
}

const Grid = <ItemT,>({
  gap,
  margin,
  numColumns,
  data,
  renderItem,
}: GridProps<ItemT>) => {
  const {width} = useWindowDimensions();
  const cellWidth = (width - margin * 2 - gap * (numColumns - 1)) / numColumns;
  return (
    <View
      style={[
        gridStyles.container,
        {
          gap: gap,
        },
      ]}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            width: cellWidth,
            height: cellWidth / 2,
          }}>
          {renderItem({item, index})}
        </View>
      ))}
    </View>
  );
};

interface TextButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

const TextButton = ({text, isSelected, onPress}: TextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        textButtonStyles.button,
        {
          backgroundColor: isSelected ? '#3544C4' : '#F1F6FF',
        },
      ]}>
      <Text
        style={[
          textButtonStyles.text,
          {
            color: isSelected ? '#fff' : '#35405A',
          },
        ]}
        numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingBottom: 100},
  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_500,
    marginTop: 20,
    marginLeft: 16,
  },
  searchTitle2: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_500,
    marginBottom: 9,
  },
  recentArea: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 6,
    gap: 11,
  },
});

const gridStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const textButtonStyles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
});

export default PerformanceSearch;
