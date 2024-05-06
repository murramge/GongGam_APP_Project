import StepHeader from '@components/header/StepHeader';
import MultiStepFormBottom from '@components/multistepform/MultiStepFormBottom';
import {colors} from '@styles/color';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {useAtomValue} from 'jotai';
import {scheduleAtom} from './ArtDaysTwoStap';
import {useNavigation} from '@react-navigation/native';
import CommunitySelectLayOut from '@components/CommunitySelectLayOut';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {date} from 'zod';
dayjs.locale('ko');

const ArtTimesThreeStap = ({route}: any) => {
  const {setValue, watch} = useFormContext();
  const id = watch('artDays');
  const schedule = useAtomValue(scheduleAtom);
  let artday = dayjs(new Date(id)).format('YYYY년 MM월 DD일');
  let selectday = dayjs(new Date(id)).locale('ko').format('ddd');
  selectday = `${selectday}요일`;
  let artlist = schedule[selectday];

  const onPress = (artday, artlist) => {
    const dateTime = dayjs(`${artday}T${artlist}`, 'YYYY-MM-DDTHH:mm');
    const isoString = dateTime.toISOString();

    setValue('artDay', artday, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('artTime', artlist, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <>
      <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
        <Text style={{fontSize: 16, color: colors.BLACK, fontWeight: '700'}}>
          공연 시간
        </Text>
      </View>
      <View style={styles.communityList}>
        {artlist &&
          artlist.map(item => {
            return (
              <TouchableOpacity
                onPress={() => onPress(artday, item)}
                style={
                  watch('artTime') == item
                    ? styles.contextselect
                    : styles.contextfalse
                }>
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      padding: 15,
                      flexDirection: 'row',
                      gap: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.RECENT_BG,
                        borderRadius: 5,
                        padding: 5,
                        zIndex: 1,
                      }}>
                      <Text style={{color: colors.GRAY_400}}>{artday}</Text>
                    </View>
                    <Text
                      style={{
                        alignItems: 'center',
                        fontSize: 16,
                        fontWeight: '600',
                        color: colors.BLACK,
                      }}>
                      {item}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contextfalse: {
    borderWidth: 0.5,
    borderColor: colors.GRAY_200,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  contextselect: {
    borderWidth: 0.5,
    borderColor: colors.GRAY_200,
    paddingHorizontal: 20,
    backgroundColor: colors.GRAY_200,
    borderRadius: 10,
  },

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

export default ArtTimesThreeStap;
