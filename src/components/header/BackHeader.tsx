import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BackHeaderProps {}

const BackHeader = ({}: BackHeaderProps) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <TouchableOpacity>
        <Icon name="arrow-back-ios" color="black" size={24}></Icon>
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 32,
            color: 'black',
            fontWeight: '500',
            textAlign: 'center',
          }}>
          샘플입니다.
        </Text>
      </View>
      <TouchableOpacity>
        <Text>Right</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BackHeader;
