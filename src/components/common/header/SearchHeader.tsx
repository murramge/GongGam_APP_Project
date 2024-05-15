import {colors} from '@styles/color';
import {HEADER_HEIGHT} from '@styles/common';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface SearchHeaderProps {
  title: string;
  onPressSearch: () => void;
}

const SearchHeader = ({title, onPressSearch}: SearchHeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: colors.BLACK, fontSize: 16}}>{title}</Text>
      <View style={{position: 'absolute', right: 16}}>
        <TouchableOpacity onPress={onPressSearch}>
          <Icon name="search" size={24} color={colors.BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;
