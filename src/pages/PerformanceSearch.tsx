import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import CommonButton from '../atoms/buttons/CommonButton';
import {colors} from '@styles/color';
import CancelButton from '../atoms/buttons/CancelButton';
import CalendarButton from '../atoms/buttons/CalendarButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchHeaderButton from '../atoms/buttons/SearchHeaderButton';

interface PerformanceSearchProps {}

const PerformanceSearch = ({}: PerformanceSearchProps) => {
  const [selectedGenre, setSelectedGenre] = useState<GenreCodeKey | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaCodeKey | null>(null);

  return (
    <View style={styles.container}>
      <SearchHeaderButton></SearchHeaderButton>
      <ScrollView>
        <View>
          <Text style={styles.searchTitle}>최근 검색어</Text>
          <View style={styles.recentArea}>
            <CancelButton label="검색어" />
          </View>
        </View>
        <View>
          <Text style={styles.searchTitle}>공연일 선택</Text>
          <CalendarButton label="날짜 선택" />
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text style={styles.searchTitle2}>장르 선택</Text>
          <Grid
            margin={16}
            numColumns={4}
            gap={10}
            data={Object.keys(GenreCode) as GenreCodeKey[]}
            renderItem={({item}) => (
              <TextButton
                text={item}
                onPress={() => setSelectedGenre(item)}
                isSelected={item === selectedGenre}
              />
            )}
          />
        </View>
        <View style={{marginHorizontal: 16, marginTop: 10}}>
          <Text style={styles.searchTitle2}>지역 선택</Text>
          <Grid
            margin={16}
            numColumns={4}
            gap={10}
            data={Object.keys(AreaCode) as AreaCodeKey[]}
            renderItem={({item}) => (
              <TextButton
                text={item}
                onPress={() => setSelectedArea(item)}
                isSelected={item === selectedArea}
              />
            )}
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <TouchableOpacity style={styles.resetArea}>
            <Icon name="redo" size={15} color={colors.GRAY_300}></Icon>
            <Text style={styles.resetText}>선택 초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchBtn}>
            <CommonButton label="검색조건 적용" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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

const AreaCode = {
  서울: 11,
  인천: 28,
  대전: 30,
  대구: 27,
  광주: 29,
  부산: 26,
  울산: 31,
  세종: 36,
  경기: 41,
  충북: 43,
  충남: 44,
  경북: 47,
  경남: 48,
  전북: 45,
  전남: 46,
  강원: 51,
  제주: 50,
  대학로: 'UNI',
} as const;
type AreaCodeKey = keyof typeof AreaCode;

const GenreCode = {
  연극: 'AAAA',
  뮤지컬: 'GGGA',
  클래식: 'CCCA',
  국악: 'CCCC',
  대중음악: 'CCCD',
  무용: 'BBBC',
  '서커스/마술': 'EEEB',
  복합: 'EEEA',
} as const;
type GenreCodeKey = keyof typeof GenreCode;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingBottom: 100},
  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_500,
    marginTop: 13,
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
    marginTop: 5,
    gap: 11,
  },
  searchBtnContainer: {
    flexDirection: 'row',
    marginTop: 22,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  resetArea: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
  },
  resetText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  searchBtn: {
    width: '70%',
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
    height: 38,
  },
});

export default PerformanceSearch;
