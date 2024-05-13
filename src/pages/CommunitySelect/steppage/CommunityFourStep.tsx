import {colors} from '@styles/color';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DateData} from 'react-native-calendars';
import {useFormContext} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import InputLabel from '@components/common/label/InputLabel';
import CalendarButton from '@atoms/buttons/CalendarButton';
import CalendarModal from '@components/common/modals/CalendarModal';
import {CommunityEditForm} from '../CommunitySelectLayOut';

interface CommunityDateSelectProps {}

const CommunityDateSelect = ({}: CommunityDateSelectProps) => {
  const {setValue, watch} = useFormContext<CommunityEditForm>();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const artDays = watch('artDays');
  const artTime = watch('artTime');
  const communityDate = watch('communityDate');

  useEffect(() => {
    if (communityDate) return;

    setValue('communityDate', dayjs(`${artDays} ${artTime}`).toISOString());
  }, [artDays, artTime]);

  return (
    <>
      <View style={{flex: 1, margin: 16}}>
        <View>
          <InputLabel label="날짜" />
          <CalendarButton
            label={
              communityDate
                ? `${dayjs(communityDate).format('YYYY년 MM월 DD일')}`
                : '날짜를 선택해주세요'
            }
            onPress={() => setIsDatePickerVisible(true)}
          />
        </View>
        <View>
          <InputLabel label="시간" />
          <CalendarButton
            label={
              communityDate
                ? `${dayjs(communityDate).format('HH시 mm분')}`
                : '시간을 선택해주세요'
            }
            onPress={() => setIsTimePickerVisible(true)}
          />
        </View>
      </View>
      <CalendarModal
        isVisible={isDatePickerVisible}
        selected={dayjs(communityDate).format('YYYY-MM-DD')}
        onDayPress={({year, month, day}: DateData) => {
          setValue(
            'communityDate',
            dayjs(communityDate)
              .year(year)
              .month(month - 1)
              .date(day)
              .toISOString(),
          );
          setIsDatePickerVisible(false);
        }}
        onBackdropPress={() => setIsDatePickerVisible(false)}
      />
      {communityDate && (
        <DatePicker
          modal
          open={isTimePickerVisible}
          date={dayjs(communityDate).toDate()}
          mode="time"
          onConfirm={date => {
            const dateDayjs = dayjs(date);
            setValue(
              'communityDate',
              dayjs(communityDate)
                .hour(dateDayjs.hour())
                .minute(dateDayjs.minute())
                .toISOString(),
            );
            setIsTimePickerVisible(false);
          }}
          onCancel={() => {
            setIsTimePickerVisible(false);
          }}
        />
      )}
    </>
  );
};
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
