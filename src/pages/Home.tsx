import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
import MainUpperCardBar from '../atoms/cards/MainUpperCardBar';

const Home = () => {
  return (
    <View>
      <Text>home</Text>
      <MainUpperCardBar />

import {View, StyleSheet} from 'react-native';
import CommonButton from '../atoms/buttons/CommonButton';
import SignInput from '@components/inputs/SignInput';
import SearchInput from '@components/inputs/SearchInput';
const Home = () => {
  return (
    <View>
      <CommonButton></CommonButton>
      <SignInput></SignInput>
      <SearchInput></SearchInput>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
