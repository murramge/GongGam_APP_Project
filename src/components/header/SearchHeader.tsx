import SearchInput from '@components/inputs/SearchInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../router';

interface SearchHeaderProps {}

const SearchHeader = ({}: SearchHeaderProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{backgroundColor: '#F5F6F7', padding: 10}}>
      <TouchableOpacity onPress={() => navigate('Search')}>
        <SearchInput></SearchInput>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SearchHeader;
