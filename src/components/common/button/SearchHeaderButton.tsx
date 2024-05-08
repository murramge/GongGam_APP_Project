import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../../../router';
interface SearchHeaderButtonProps {}

const SearchHeaderButton = ({}: SearchHeaderButtonProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{backgroundColor: '#F5F6F7', padding: 10}}>
      <TouchableOpacity
        onPress={() => {
          navigate('Search');
        }}>
        <View style={styles.SearchInput}>
          <View style={{padding: 10, paddingBottom: 15}}>
            <Text>검색어를 입력해주세요.</Text>
          </View>
          <View style={styles.IconsCenter}>
            <Icon name="search" size={15} color="black"></Icon>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SearchInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconsCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default SearchHeaderButton;
