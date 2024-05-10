import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {colors} from '@styles/color';

export const MainPageBottomCardSkeleton = () => {
  return (
    <View style={{marginLeft: 12}}>
      <Text style={styles.titleText}>인기</Text>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.container} />
          <View style={styles.container} />
          <View style={styles.container} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxOfficeContainer: {
    marginLeft: 12,
  },
  titleText: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    marginLeft: 5,
  },
  separator: {
    width: 8,
  },
  container: {
    backgroundColor: colors.GRAY_200,
    borderRadius: 12,
    overflow: 'hidden',
    width: 150,
    height: 300,
    borderWidth: 1,
    margin: 5,
    borderColor: colors.GRAY_200,
    shadowColor: colors.GRAY_500,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export const MainPageTopCardSkeleton = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
      }}>
      <View
        style={{
          paddingVertical: 10,
          borderRadius: 16,
          width: screenWidth - 40,
          height: 150,
          backgroundColor: colors.GRAY_200,
          justifyContent: 'center',
        }}
      />
    </View>
  );
};
