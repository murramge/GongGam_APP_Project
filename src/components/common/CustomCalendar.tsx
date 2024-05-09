import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {DateData, MarkedDates} from 'react-native-calendars/src/types';

interface CustomCalendarProps {
  current?: string;
  minDate?: string;
  maxDate?: string;
  onDayPress?: (date: DateData) => void;
  markedDates?: MarkedDates;
  onMonthChange?: (date: DateData) => void;
}

const CustomCalendar = ({
  current,
  maxDate,
  minDate,
  onDayPress,
  markedDates,
  onMonthChange,
}: CustomCalendarProps) => {
  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 10,
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
      current={current}
      minDate={minDate}
      maxDate={maxDate}
      onDayPress={onDayPress}
      markedDates={markedDates}
      firstDay={1}
      enableSwipeMonths={true}
      onMonthChange={onMonthChange}
    />
  );
};

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

export default CustomCalendar;
