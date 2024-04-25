import ArtList from '@components/ArtList';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const Home = () => {
  return (
    <View>
      <Text>home</Text>
      <View>
        <ArtList />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Home;
