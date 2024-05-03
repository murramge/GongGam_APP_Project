import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';
import BackHeader from '@components/header/BackHeader';

const MeetingSummary = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader label="모임을 확인해주세요" />
      <View style={{paddingLeft: 120, paddingTop: 200, paddingBottom: 70}}>
        <View style={{flexDirection: 'row', paddingBottom: 4}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.BLACK,
            }}>
            공연이름:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
            }}>
            마틸다
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 4}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: colors.BLACK}}>
            공연날짜:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
            }}>
            2024.05.05
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 4}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: colors.BLACK}}>
            공연시간:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
            }}>
            PM 12:00
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 4}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: colors.BLACK}}>
            모임날짜:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
            }}>
            2024.05.04
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: colors.BLACK}}>
            모임시간:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
            }}>
            PM 12:00
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <LottieView
          style={{
            width: 300,
            height: 150,
          }}
          source={require('@lotties/summaryTicket.json')}
          autoPlay
          loop={true}
        />
      </View>
    </View>
  );
};

export default MeetingSummary;