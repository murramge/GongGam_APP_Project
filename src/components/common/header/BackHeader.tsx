import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '@router.d';
import {colors} from '@styles/color';

interface BackHeaderProps {
  Color?: {
    leftIconsColor?: string;
    rightIconsColor?: string;
    labelColor?: string;
  };
  label: string | undefined;
  icon?: string | null;
  showLeftIcon?: boolean | undefined;
  onPressBack?: () => void;
}

const BackHeader = ({
  Color = {
    leftIconsColor: 'black',
    rightIconsColor: 'black',
    labelColor: 'black',
  },
  label,
  icon = null,
  onPressBack,
}: BackHeaderProps) => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <View style={{width: '5%'}}>
        <TouchableOpacity
          onPress={onPressBack ? onPressBack : () => navigate.goBack()}>
          <Icon
            name="chevron-left"
            color={Color.leftIconsColor}
            size={20}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '90%'}}>
        <Text
          style={{
            fontSize: 16,
            color: Color.labelColor,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 20,
          }}>
          {label}
        </Text>
      </View>
      <View style={{width: '6%'}}>
        <TouchableOpacity>
          <Icon name={icon} color={Color.leftIconsColor} size={20}></Icon>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BackHeader;
