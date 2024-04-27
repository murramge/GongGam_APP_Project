import React, {useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import CommonButton from '../atoms/buttons/CommonButton';

interface PerformanceSearchProps {}

const PerformanceSearch = ({}: PerformanceSearchProps) => {
  const [selectedGenre, setSelectedGenre] = useState<GenreCodeKey | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaCodeKey | null>(null);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 100}}>
      <View style={{margin: 16, gap: 16}}>
        <Text>공연일 선택</Text>
        <CommonButton label="날짜 선택" />
      </View>
      <View style={{margin: 16, gap: 16}}>
        <Text>장르 선택</Text>
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
      <View style={{margin: 16, gap: 16}}>
        <Text>지역 선택</Text>
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
    </View>
  );
};

const Grid = <ItemT,>({
  gap,
  margin,
  numColumns,
  data,
  renderItem,
}: {
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
}) => {
  const {width} = useWindowDimensions();
  const cellWidth = (width - margin * 2 - gap * (numColumns - 1)) / numColumns;
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: gap,
      }}>
      {data.map((item, index) => (
        <View
          style={{
            width: cellWidth,
            height: cellWidth / 1.5,
          }}>
          {renderItem({item, index})}
        </View>
      ))}
    </View>
  );
};

const TextButton = ({
  text,
  isSelected,
  onPress,
}: {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: 8,
          flex: 1,
          backgroundColor: isSelected ? '#3544C4' : '#F1F6FF',
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
        },
      ]}>
      <Text
        style={{
          fontWeight: 'bold',
          color: isSelected ? '#fff' : '#35405A',
        }}
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

export default PerformanceSearch;
