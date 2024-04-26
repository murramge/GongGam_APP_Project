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

const Home = ({date, stsType, categoryCode, area}: HomeProps) => {
  return (
    <View>
      <Text>home</Text>
      <View>
        <ArtList
          date={date}
          stsType={stsType}
          categoryCode={categoryCode}
          area={area}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Home;
