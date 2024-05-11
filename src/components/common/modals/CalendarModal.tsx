import dayjs from 'dayjs';
import React from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import Modal from 'react-native-modal';

interface CalendarModalProps {
  isVisible: boolean;
  onDayPress: (date: DateData) => void;
  onBackdropPress: () => void;
  selected: string;
}

const CalendarModal = ({
  isVisible,
  onDayPress,
  onBackdropPress,
  selected,
}: CalendarModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Calendar
        onDayPress={onDayPress}
        current={selected}
        markedDates={{
          [selected]: {marked: true, selected: true},
        }}
      />
    </Modal>
  );
};

export default CalendarModal;
