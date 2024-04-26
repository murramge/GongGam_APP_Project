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
    <TouchableOpacity
      onPress={() => setSelectItem(item)}
      style={[styles.categoryButton, item === selectItem && styles.selected]}>
      <Text
        style={item === selectItem ? styles.selectedText : styles.categoryText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={['All', ...Object.values(PerformanceGenre)]}
        horizontal
        renderItem={onCategoriesRender}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
      />
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
