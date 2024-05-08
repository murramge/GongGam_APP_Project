import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {atom, useAtom} from 'jotai';
import {PerformanceGenre} from '@utils/category';
import {PerformanceCategory} from '@apis/kopis.d';
import {colors} from '@styles/color';
interface MainCategoriesProps {}

export const selectAtom = atom('All');

const MainCategories = ({}: MainCategoriesProps) => {
  const [selectItem, setSelectItem] = useAtom(selectAtom);

  const onCategoriesRender = ({item}: any) => (
    <TouchableOpacity onPress={() => setSelectItem(item)}>
      <Text
        style={[
          {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            paddingHorizontal: 27,
            paddingBottom: 8,
            color: colors.GRAY_400,
          },
          item == selectItem && {
            backgroundColor: '#3544C4',
            color: '#EBEDFF',
            borderRadius: 8,
            fontWeight: 'bold',
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{paddingHorizontal: 10, marginHorizontal: 7, marginTop: -17}}>
      <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
        Categories
      </Text>
      <View>
        <FlatList
          data={['All', ...Object.values(PerformanceGenre)]}
          horizontal
          renderItem={onCategoriesRender}
          style={{
            backgroundColor: colors.SEARCH_BG,
            marginVertical: 8,
            borderRadius: 12,
          }}
          showsHorizontalScrollIndicator={false}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  list: {
    backgroundColor: '#E8E8EA',
    marginVertical: 15,
    borderRadius: 12,
  },
  categoryButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingHorizontal: 27,
    paddingVertical: 8,
  },
  categoryText: {
    color: 'black',
  },
  selected: {
    backgroundColor: '#3544C4',
    borderRadius: 8,
  },
  selectedText: {
    color: '#EBEDFF',
  },
});

export default MainCategories;
