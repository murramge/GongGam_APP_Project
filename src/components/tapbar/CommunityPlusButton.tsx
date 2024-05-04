import {useNavigation} from '@react-navigation/native';
import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../router';
interface CommunityPlusButtonProps {}

const CommunityPlusButton = ({}: CommunityPlusButtonProps) => {
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigate('CommunitySelectLayOut')}
        style={{
          position: 'absolute',
        }}>
        <View style={{padding: 20}}>
          <Icon name="pluscircle" size={40} color={colors.MAIN_COLOR}></Icon>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunityPlusButton;
