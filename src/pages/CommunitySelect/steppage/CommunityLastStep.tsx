import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';
import {useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';
import {CommunityEditForm} from '../CommunitySelectLayOut';

const CommunitySummary = () => {
  const {watch} = useFormContext<CommunityEditForm>();

  return (
    <View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
          paddingTop: 200,
          paddingBottom: 70,
        }}>
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
              flex: 1,
              fontSize: 18,
              fontWeight: '700',
              color: colors.MAIN_COLOR,
              paddingLeft: 5,
              width: '100%',
            }}>
            {watch('artTitle')}
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
            {dayjs(watch('artDays')).format(dateFormat)}
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
            {watch('artTime')}
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
            {dayjs(watch('communityDate')).format(dateFormat)}
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
            {dayjs(watch('communityDate')).format(timeFormat)}
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

const dateFormat = 'YYYY년 MM월 DD일';
const timeFormat = 'HH:mm';

export default CommunitySummary;
