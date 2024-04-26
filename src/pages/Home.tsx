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
    </View>
  );
};
const styles = StyleSheet.create({});

export default Home;
