import SearchInputBack from '@components/inputs/SearchInputBack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  return (
    <View style={styles.searchContainer}>
      <View>
        <SearchInputBack></SearchInputBack>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
  },
  searchBackIcon: {
    width: '20%',
  },
});

export default SearchPage;
