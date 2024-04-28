import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonInput from '../../atoms/inputs/CommonInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@styles/color';

interface SearchInputBackProps {}

const SearchInputBack = ({}: SearchInputBackProps) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBackIcon}>
        <TouchableOpacity>
          <Icon name="arrow-back-outline" size={24} color="black"></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.SearchInput}>
        <View>
          <CommonInput label="검색어를 입력해주세요"></CommonInput>
        </View>
        <TouchableOpacity style={styles.IconsCenter}>
          <Icon name="search" size={20} color="black"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: colors.SEARCH_BG,
  },
  searchBackIcon: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  SearchInput: {
    width: '82%',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconsCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default SearchInputBack;
