import {GenreCode, PerformanceGenreKey} from '@apis/kopis.d';
import TextButton from '@atoms/buttons/TextButton';
import CustomCalendar from '@components/common/CustomCalendar';
import SignInput from '@components/common/input/SignInput';
import InputLabel from '@components/common/label/InputLabel';
import Grid from '@components/common/layout/Grid';
import {colors} from '@styles/color';
import dayjs, {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import {ScrollView, Dimensions, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface CommunityFilterProps {}

const CommunityFilter = ({}: CommunityFilterProps) => {
  const [perfName, setPerfName] = useState<string>('');
  const [perfGenre, setPerfGenre] = useState<PerformanceGenreKey>();
  const [meetingAt, setMeetingAt] = useState<Dayjs>();
  const [maxOccupancy, setMaxOccupancy] = useState<number>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollView
        scrollEnabled={!open}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.inputContainer}>
          <InputLabel label="공연이름" />
          <SignInput
            label="공연이름을 입력해주세요."
            onChangeText={setPerfName}
            value={perfName}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputLabel label="모임일정" />
          <CustomCalendar
            markedDates={
              meetingAt
                ? {[meetingAt.format('YYYY-MM-DD')]: {selected: true}}
                : {}
            }
            onDayPress={date => {
              if (date.dateString === meetingAt?.format('YYYY-MM-DD')) {
                setMeetingAt(undefined);
              } else {
                setMeetingAt(dayjs(date.dateString));
              }
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputLabel label="장르" />
          <Grid
            width={width - padding * 2}
            numColumns={4}
            gap={4}
            data={PerformanceGenre}
            renderItem={({item}) => (
              <TextButton
                text={item}
                onPress={() =>
                  perfGenre === item
                    ? setPerfGenre(undefined)
                    : setPerfGenre(item)
                }
                isSelected={item === perfGenre}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputLabel label="최대 인원수" />
          <DropDownPicker
            open={open}
            value={maxOccupancy}
            items={data}
            setOpen={setOpen}
            setValue={value => {
              setMaxOccupancy(value);
            }}
            itemKey="label"
            placeholder={'상관 없음'}
            style={{borderColor: colors.GRAY_200}}
            dropDownDirection="TOP"
            listMode="SCROLLVIEW"
          />
        </View>
      </ScrollView>
    </>
  );
};

const width = Dimensions.get('window').width;
const padding = 16;
const PerformanceGenre = Object.keys(GenreCode).filter(
  item => item !== '아동' && item !== '오픈런',
) as PerformanceGenreKey[];
const data = [
  {label: '상관없음', value: undefined},
  ...Array(9)
    .fill(2)
    .map((value, index) => ({
      label: `${index + value}명`,
      value: index + value,
    })),
];

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  scrollContentContainer: {gap: 16, padding},
  inputContainer: {
    gap: 8,
  },
});

export default CommunityFilter;
