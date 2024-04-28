import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonInput from '../../atoms/inputs/CommonInput';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchInputProps {}

const SearchInput = ({}: SearchInputProps) => {
  return (
    <View style={styles.SearchInput}>
      <View>
        <CommonInput label="검색어를 입력해주세요"></CommonInput>
      </View>
      <TouchableOpacity style={styles.IconsCenter}>
        <Icon name="search" size={15} color="black"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SearchInput: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconsCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default SearchInput;
