import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonInput from '../../../atoms/inputs/CommonInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@styles/color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
interface SearchInputProps {
  type?: string;
  value?: string;
  onPressSearch: () => void;
  onChangeText: (text: string) => void;
}

const SearchInput = ({
  type,
  value,
  onPressSearch,
  onChangeText,
}: SearchInputProps) => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBackIcon}>
        {type == 'back' && (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.SearchInput}>
        <CommonInput
          value={value}
          label="검색어를 입력해주세요"
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.IconsCenter} onPress={onPressSearch}>
          <Icon name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    backgroundColor: colors.SEARCH_BG,
  },
  searchBackIcon: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  SearchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconsCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default SearchInput;
