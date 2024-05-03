import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import WheelPick from 'react-native-wheely';

interface MeetingDateSelectProps {}

const MeetingDateSelect = ({}: MeetingDateSelectProps) => {
  const [selectedDate, setSelectedDate] = useState();
  const [setectedTime, setSelectedTime] = useState();
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View>
        <Text style={styles.labelText}>모임 날짜</Text>
        <Calendar />
      </View>
      <View style={{gap: 20}}>
        <Text style={styles.labelText}>모임 시간</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomWheelPick data={ampmArray} />
          <CustomWheelPick data={hourArray} />
          <Text
            style={{
              color: colors.BLACK,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            :
          </Text>
          <CustomWheelPick data={minuteArray} />
        </View>
      </View>
    </View>
  );
};

const CustomWheelPick = ({data}: {data: string[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <WheelPick
      containerStyle={{width: 'auto'}}
      itemTextStyle={{color: colors.BLACK, fontWeight: 'bold', fontSize: 18}}
      selectedIndicatorStyle={{backgroundColor: colors.WHITE}}
      selectedIndex={currentIndex}
      options={data}
      onChange={setCurrentIndex}
    />
  );
};
const ampmArray = ['오전', '오후'];
const hourArray = Array.from(new Array(12), (_, index) =>
  `${index + 1}`.padStart(2, '0'),
);
const minuteArray = Array.from(new Array(60), (_, index) =>
  `${index}`.padStart(2, '0'),
);

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_500,
    marginTop: 20,
    marginLeft: 16,
  },
});

export default MeetingDateSelect;
