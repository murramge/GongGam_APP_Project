import StepHeader from '@common/header/StepHeader';
import MultiStepFormBottom from '@common/multistepform/MultiStepFormBottom';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@styles/color';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import WheelPick from 'react-native-wheely';
import {RootStackParamList} from '../../../router';
import {useFormContext} from 'react-hook-form';

interface CommunityDateSelectProps {}

const CommunityDateSelect = ({}: CommunityDateSelectProps) => {
  const {setValue} = useFormContext();
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedTime, setSelectedTime] = useState<Time>({
    hour: '01',
    minute: '00',
    ampm: '오전',
  });
  const handleTimeChange = useCallback(
    (type: keyof Time) => (value: string) => {
      setSelectedTime(prev => ({...prev, [type]: value}));
    },
    [],
  );

  const onPressDate = useCallback((date: DateData) => {
    date && setSelectedDate(date.dateString);
  }, []);

  useEffect(() => {
    const hour24 =
      selectedTime.ampm === '오전'
        ? parseInt(selectedTime.hour) % 12
        : (parseInt(selectedTime.hour) % 12) + 12;

    const dateString = `${selectedDate}T${hour24.toString().padStart(2, '0')}:${
      selectedTime.minute
    }:00`;

    setValue('communityDate', dayjs(dateString).toISOString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedDate, selectedTime, setValue]);

  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={styles.labelText}>모임 날짜</Text>
        <Calendar
          onDayPress={onPressDate}
          current={dayjs(new Date()).format('YYYY-MM-DD')}
          markedDates={{
            [selectedDate]: {selected: true},
          }}
        />
      </View>
      <View>
        <Text style={styles.labelText}>모임 시간</Text>
        <View style={styles.timeWheelsContainer}>
          <View style={styles.timeWheels}>
            <CustomWheelPick
              data={ampmArray}
              onChange={handleTimeChange('ampm')}
            />
            <CustomWheelPick
              data={hourArray}
              onChange={handleTimeChange('hour')}
            />
            <Text style={styles.timeSeperator}>:</Text>
            <CustomWheelPick
              data={minuteArray}
              onChange={handleTimeChange('minute')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const CustomWheelPick = ({
  data,
  onChange,
}: {
  data: string[];
  onChange: (value: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <WheelPick
      containerStyle={{width: 'auto'}}
      itemTextStyle={{color: colors.BLACK, fontWeight: 'bold', fontSize: 18}}
      selectedIndicatorStyle={{backgroundColor: colors.WHITE}}
      selectedIndex={currentIndex}
      options={data}
      onChange={index => {
        setCurrentIndex(index);
        onChange(data[index]);
      }}
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

interface Time {
  hour: string;
  minute: string;
  ampm: '오전' | '오후';
}

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_500,
    marginTop: 20,
    marginLeft: 16,
  },
  timeWheelsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeWheels: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  timeSeperator: {
    color: colors.BLACK,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CommunityDateSelect;
