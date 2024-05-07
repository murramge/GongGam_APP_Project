import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@styles/color';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import {getPerformanceDetail} from '@apis/kopis';
import {PerformanceDetailInfo} from '@apis/kopis';
import {divFuntion, parseSchedule} from '@utils/splitdate';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import utc from 'dayjs/plugin/utc';
import MultiStepFormBottom from '@components/common/multistepform/MultiStepFormBottom';
import {atom, useAtom} from 'jotai';
import CommunitySelectLayOut from '@components/communitySelect/CommunitySelectLayOut';
dayjs.extend(utc);
import {useForm, useFormContext} from 'react-hook-form';

export const scheduleAtom = atom({});

const ArtDaysTwoStap = ({route}: any) => {
  const [detailInfo, setDetailInfo] = useState<PerformanceDetailInfo | null>();
  const [missingDayIndex, setMissingDayIndex] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [startday, setStartDay] = useState();
  const [lastday, setLastDay] = useState();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedDate, setSelectedDate] = useState();
  const [schedule, setSchedule] = useAtom(scheduleAtom);
  const {setValue, watch} = useFormContext();

  const [currentMonth, setCurrentMonth] = useState();

  let id = watch('artId');

  useEffect(() => {
    const fetchDetail = async () => {
      console.log(id);
      try {
        const data = await getPerformanceDetail({performanceId: id});

        if (
          data &&
          dayjs(data.prfpdfrom, 'YYYY.MM.DD').isValid() &&
          dayjs(data.prfpdto, 'YYYY.MM.DD').isValid()
        ) {
          setDetailInfo(data);
          setStartDay(dayjs(data.prfpdfrom, 'YYYY.MM.DD').format('YYYY-MM-DD'));
          setLastDay(dayjs(data.prfpdto, 'YYYY.MM.DD').format('YYYY-MM-DD'));
        }
      } catch (e) {
        console.error('Fetching error:', e);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (detailInfo) {
      const inputString = detailInfo.dtguidance;
      const parsedData = parseSchedule(inputString);
      const collectedSchedule = divFuntion(parsedData);
      setSchedule(collectedSchedule);
      if (collectedSchedule) {
        const allDays = [
          '월요일',
          '화요일',
          '수요일',
          '목요일',
          '금요일',
          '토요일',
          '일요일',
        ];
        const presentDays = Object.keys(collectedSchedule);
        const missingDays = allDays.filter(day => !presentDays.includes(day));
        const missingDayIndex = missingDays.map(
          day => allDays.indexOf(day) + 1,
        );

        setMissingDayIndex(missingDayIndex);
      }
    }
  }, [detailInfo]);

  useEffect(() => {
    if (currentMonth !== new Date(startday).getMonth()) {
      setCurrentMonth(new Date(startday).getMonth());
      getDisabledDays(
        new Date(startday).getMonth(),
        new Date(startday).getFullYear(),
        missingDayIndex,
      );
    }
  }, [startday, missingDayIndex, currentMonth]);

  const getDisabledDays = (month, year, daysIndexes) => {
    let dates = {};
    if (!daysIndexes || !daysIndexes.length) {
      console.log('No day indexes provided or invalid.');
      return;
    }

    let startOfMonth = dayjs
      .utc(`${year}-${month + 1}-01`)
      .startOf('month')
      .local();
    let endOfMonth = dayjs
      .utc(`${year}-${month + 1}-01`)
      .endOf('month')
      .local();

    const disabled = {disabled: true, disableTouchEvent: true};

    daysIndexes.forEach(dayIndex => {
      let current = startOfMonth.day(dayIndex);
      if (current.isBefore(startOfMonth)) {
        current = current.add(1, 'week');
      }

      while (current.isSameOrBefore(endOfMonth)) {
        dates[current.format('YYYY-MM-DD')] = disabled;
        current = current.add(1, 'week'); // 이 부분이 중요합니다
      }
    });

    setMarkedDates(dates); // 상태 업데이트
  };

  const onDayPress = useCallback(
    day => {
      setValue('artDays', day.dateString, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const markedSelectedDates = {
    ...markedDates,
    [watch('artDays')]: {
      selected: true,
      marked: markedDates[watch('artDays')]?.marked,
    },
  };

  return (
    <>
      <View style={styles.communityList}>
        {dayjs(startday).isValid() &&
          dayjs(lastday).isValid() &&
          missingDayIndex.length > 0 && (
            <Calendar
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
              }}
              current={startday}
              minDate={startday}
              maxDate={lastday}
              onDayPress={day => onDayPress(day)}
              markedDates={markedSelectedDates}
              firstDay={1}
              enableSwipeMonths={true}
              onMonthChange={date => {
                getDisabledDays(date.month - 1, date.year, missingDayIndex);
              }}
            />
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  searchInputArea: {
    backgroundColor: colors.SEARCH_BG,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
  },
  communityList: {
    flex: 0.65,
    marginHorizontal: 30,
  },
  selectBottom: {
    width: '93%',
    justifyContent: 'flex-end',
    marginHorizontal: 12,
    marginTop: 10,
  },
  indicatorBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.SEARCH_BG,
  },
  step01: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  step02: {
    position: 'absolute',
    top: 0,
    left: '33.5%',
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  step03: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '33%',
    height: 6,
    backgroundColor: colors.MAIN_COLOR,
  },
  stepBtnArea: {
    flexDirection: 'row',
    marginTop: 28,
  },
  prev: {
    width: '30%',
  },
  next: {
    width: '70%',
  },
});

export default ArtDaysTwoStap;
