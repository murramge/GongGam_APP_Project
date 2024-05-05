import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@styles/color';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../router';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
interface CommonArtCardItemProps {
  data: {
    item: {
      id: string;
      perf_image_url?: string; // 공연 이미지 URL
      perf_name: string; // 공연 이름
      title: string; // 모임 제목
      perf_at: string; // 공연일정
      meeting_at: string; // 모임일정
      current_occupancy: number; // 현재 참여 인원
      max_occupancy: number; // 최대 참여 인원
    };
  };
}

const CommunityCardItem = ({data}: CommonArtCardItemProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const item = data.item;
  let perfDay = dayjs(item.perf_at).format('YY년 MM월 DD일 HH시 mm분');
  let meetDay = dayjs(item.meeting_at).format('YY년 MM월 DD일 HH시 mm분');

  const onPress = () => {
    navigate('CommunityDetail', {id: item.id});
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigate('CommunityDetail', {id: item.id});
        }}>
        <View style={styles.photo}>
          {item.perf_image_url && (
            <Image style={styles.photo} source={{uri: item.perf_image_url}} />
          )}
        </View>
        <View style={styles.right}>
          <View style={styles.cateArea}>
            <Text
              style={styles.cateText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.perf_name}
            </Text>
          </View>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.descriptionText}>
            <Text style={{color: colors.MAIN_COLOR}}>공연일정 </Text> {perfDay}
          </Text>
          <Text style={styles.descriptionText}>
            <Text style={{color: colors.MAIN_COLOR}}>모임일정 </Text> {meetDay}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name="person" size={10} style={{padding: 4}}></Icon>
            <Text style={styles.descriptionText}>
              인원 {item.current_occupancy}/{item.max_occupancy}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.LINE_COLOR,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    gap: 2,
  },
  photo: {
    width: 117,
    height: 128,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    shadowColor: colors.GRAY_500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  right: {
    marginTop: 13,
    marginLeft: 20,
    gap: 3,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.LINE_COLOR,
  },
  nameText: {
    color: colors.GRAY_500,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    color: colors.GRAY_300,
    fontSize: 11,
    fontWeight: '600',
    padding: 2,
  },
  cateArea: {
    borderWidth: 0.5,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.MAIN_COLOR,
    width: '100%',
    borderRadius: 4,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cateText: {
    color: colors.WHITE,
    fontSize: 13,
    paddingHorizontal: 10,
    fontWeight: '700',
  },
});

export default CommunityCardItem;
