import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@styles/color';
interface MainDetailsMapProps {}

const MainDetailsMap = ({}: MainDetailsMapProps) => {
  return (
    <>
      <View style={{flex: 1}}>
        <View>
          <Text
            style={{
              paddingLeft: 18,
              paddingBottom: 8,
              fontWeight: '600',
              fontSize: 16,
              color: colors.Black,
            }}>
            지도
          </Text>
        </View>
        <MapView
          style={{width: '100%', height: 300}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default MainDetailsMap;
