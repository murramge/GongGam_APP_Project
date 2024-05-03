import StepHeader from '@components/header/StepHeader';
import MultiStepFormBottom from '@components/multistepform/MultiStepFormBottom';
import {colors} from '@styles/color';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import WheelPick from 'react-native-wheely';

interface MeetingDateSelectProps {}

const MeetingDateSelect = ({}: MeetingDateSelectProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedTime, setSelectedTime] = useState<Time>({
    hour: '01',
    minute: '00',
    ampm: '오전',
  });

  const onPressDate = (date: DateData) =>
    date && setSelectedDate(date.dateString);
  const handleTimeChange = (type: keyof Time) => (value: string) =>
    setSelectedTime(prev => ({...prev, [type]: value}));

  const onPressPrevButton = () => {
    // TODO: 이전페이지로
  };

  const onPressNextButton = () => {
    // TODO: 다음페이지로, form에 데이터 저장
    console.log(getISODateTime());
  };

  const getISODateTime = () => {
    const hour24 =
      selectedTime.ampm === '오전'
        ? parseInt(selectedTime.hour) % 12
        : (parseInt(selectedTime.hour) % 12) + 12;

    const dateString = `${selectedDate}T${hour24.toString().padStart(2, '0')}:${
      selectedTime.minute
    }:00`;

    return dayjs(dateString).toISOString();
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      {/* Header */}
      <StepHeader label="함께 모일 시간을 알려주세요" />

      {/* Content */}
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 0,
                alignItems: 'center',
              }}>
              <CustomWheelPick
                data={ampmArray}
                onChange={handleTimeChange('ampm')}
              />
              <CustomWheelPick
                data={hourArray}
                onChange={handleTimeChange('hour')}
              />
              <Text
                style={{
                  color: colors.BLACK,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                :
              </Text>
              <CustomWheelPick
                data={minuteArray}
                onChange={handleTimeChange('minute')}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom */}
      <MultiStepFormBottom
        currentStep={3}
        maxStep={6}
        onPressNextButton={onPressNextButton}
        onPressPrevButton={onPressPrevButton}
      />
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
});

export default MeetingDateSelect;
