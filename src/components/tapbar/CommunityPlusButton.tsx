import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
interface CommunityPlusButtonProps {}

const CommunityPlusButton = ({}: CommunityPlusButtonProps) => {
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
      }}>
      <Text
        style={{
          fontSize: 15,
          paddingRight: 2,
          color: colors.MAIN_COLOR,
          fontFamily: 'Nanum Brush Script',
        }}>
        내 모임을 생성해보세요!
      </Text>
      <TouchableOpacity>
        <Icon name="pluscircle" size={40} color={colors.MAIN_COLOR}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunityPlusButton;
