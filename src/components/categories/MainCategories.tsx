import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
interface MainCategoriesProps {}

const PerformanceGenre = {
  AAAA: '연극',
  GGGA: '뮤지컬',
  CCCA: '클래식',
  CCCC: '국악',
  CCCD: '대중음악',
  BBBC: '무용',
  BBBR: '대중무용',
  EEEB: '서커스/마술',
  EEEA: '복합',
  KID: '아동',
  OPEN: '오픈런',
};

const MainCategories = ({}: MainCategoriesProps) => {
  const [selectItem, setSelectItem] = useState('All');

  const onCategoriesRender = ({item}) => (
    <TouchableOpacity onPress={() => setSelectItem(item)}>
      <Text
        style={[
          item == selectItem && {
            backgroundColor: '#3544C4',
            color: '#EBEDFF',
            borderRadius: 8,
          },
          {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            paddingHorizontal: 27,
            paddingVertical: 8,
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
        Categories
      </Text>
      <View>
        <FlatList
          data={['All', ...Object.values(PerformanceGenre)]}
          horizontal
          renderItem={onCategoriesRender}
          style={{
            backgroundColor: '#E8E8EA',
            marginVertical: 15,
            borderRadius: 12,
          }}
          showsHorizontalScrollIndicator={false}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainCategories;
