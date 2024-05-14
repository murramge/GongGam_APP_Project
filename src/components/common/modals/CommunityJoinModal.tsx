import React from 'react';
import {View, Text, Image, Modal, Pressable, StyleSheet} from 'react-native';
import {colors} from '@styles/color';
import CommonButton from '../../../atoms/buttons/CommonButton';
import dayjs from 'dayjs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@router.d';
import {joinMeeting} from '@apis/supabase/meeting';
import Config from 'react-native-config';

interface CommunityJoinModalProps {
  isJoinModalOpen: boolean;
  onPressJoinCancel: () => void;
  perf_image_url: string;
  title: string;
  perf_name: string;
  perf_at: string;
  meeting_at: string;
  current_occupancy: number;
  max_occupancy: string;
  id: string;
  meetingId: number;
  //navigation: NativeStackNavigationProp<RootStackParamList>;
}

const CommunityJoinModal = ({
  isJoinModalOpen,
  onPressJoinCancel,
  perf_image_url,
  perf_name,
  title,
  id,
  perf_at,
  meeting_at,
  current_occupancy,
  max_occupancy,
  meetingId,
}: CommunityJoinModalProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isJoinModalOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{
                  uri: `${Config.KOPIS_IMAGE_BASE_URL}/${perf_image_url}`,
                }}
                style={styles.profileImg}
              />
              <View style={{paddingLeft: 16}}>
                <View style={styles.titleArea}>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {perf_name}
                  </Text>
                  <Text style={styles.communityTitle}>{title}</Text>
                </View>
                <View style={styles.scheduleSection}>
                  <Text style={styles.scheduleLabel}>공연일정</Text>
                  <Text style={styles.scheduleDateTime}>
                    {dayjs(perf_at).format('YYYY년 MM월 DD일 HH시 mm분')}
                  </Text>
                </View>
                <View style={styles.scheduleSection}>
                  <Text style={styles.scheduleLabel}>모임일정</Text>
                  <Text style={styles.scheduleDateTime}>
                    {dayjs(meeting_at).format('YYYY년 MM월 DD일 HH시 mm분')}
                  </Text>
                </View>
                <View style={styles.scheduleSection}>
                  <IonIcon name="person" color={colors.GRAY_300} />
                  <Text style={styles.peopleLabel}>인원</Text>
                  <Text
                    style={
                      styles.peopleCount
                    }>{`${current_occupancy}/${max_occupancy}`}</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.BLACK,
                lineHeight: 28,
                textAlign: 'center',
                paddingTop: 50,
                paddingBottom: 24,
              }}>
              {isJoinModalOpen}
              선택한 모임에 참가하시겠습니까?{'\n'}
              아래 버튼을 누르면{'\n'}
              모임상세를 보실 수 있습니다.
            </Text>
            <View style={{paddingBottom: 10, width: 300}}>
              <CommonButton
                label="공연함께 보기 참가"
                borderRadius={32}
                onPress={() => {
                  onPressJoinCancel();
                  joinMeeting(meetingId);
                  //navigate('AuthHome');
                }}
              />
            </View>
            <Pressable
              style={{
                width: 300,
                backgroundColor: colors.GRAY_300,
                paddingHorizontal: 24,
                paddingVertical: 18,
                borderRadius: 32,
                margin: 2,
              }}
              onPress={onPressJoinCancel}>
              <Text style={styles.textStyle}>아니요</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 35,
    width: 374,
    height: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scheduleSection: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  scheduleLabel: {
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 12,
    paddingBottom: 6,
  },
  scheduleDateTime: {
    color: colors.GRAY_400,
    fontWeight: '700',
    fontSize: 12,
    paddingBottom: 6,
  },
  peopleLabel: {
    color: colors.GRAY_400,
  },
  peopleCount: {
    color: colors.GRAY_400,
  },
  titleArea: {
    marginTop: 16,
    gap: 4,
  },
  title: {
    maxWidth: '60%',
    color: colors.WHITE,
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  communityTitle: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    width: 200,
    marginLeft: 5,
    paddingBottom: 6,
  },
  profileImg: {
    borderRadius: 16,
    width: 120,
    height: 120 * 1.1,
  },
});
export default CommunityJoinModal;
