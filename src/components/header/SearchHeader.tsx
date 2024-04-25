import SearchInput from '@components/inputs/SearchInput';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface SearchHeaderProps {}

const SearchHeader = ({}: SearchHeaderProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#F5F6F7', padding: 10}}>
      <SearchInput></SearchInput>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SearchHeader;
