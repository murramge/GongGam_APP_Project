import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../router';

interface BackHeaderProps {
  Color?: {
    leftIconsColor?: string;
    rightIconsColor?: string;
    labelColor?: string;
  };
  label: string | undefined;
  rightIcon?: string;
}

const BackHeader = ({
  Color = {
    leftIconsColor: 'black',
    rightIconsColor: 'black',
    labelColor: 'black',
  },
  label,
  rightIcon = '',
}: BackHeaderProps) => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <View style={{width: '5%'}}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Icon
            name="arrow-back-ios"
            color={Color.leftIconsColor}
            size={24}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', width: '90%'}}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            lineHeight: 32,
            color: Color.labelColor,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
      <View style={{width: '5%'}}>
        <TouchableOpacity>
          <Icon name={rightIcon} color={Color.rightIconsColor} size={24}></Icon>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BackHeader;
