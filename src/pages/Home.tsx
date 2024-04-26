import ArtList from '@components/ArtList';
import {
  PerformanceCategory,
  PerformanceStsType,
} from '@interfaces/kopis.interface';
import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

interface HomeProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory;
  area?: string;
}

const Home = ({}: HomeProps) => {
  return (
    <View>
      <Text>home</Text>
      <View>
        <ArtList date="20240425" stsType="day" />
      </View>
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
