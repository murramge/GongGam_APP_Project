import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Button,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import BackHeader from '@components/common/header/BackHeader';
import CommunityQuitModal from '@components/common/modals/CommunityQuitModal';
import CommunityJoinModal from '@components/common/modals/CommunityJoinModal';
import {colors} from '@styles/color';
import IonIcon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import CommonButton from '../../atoms/buttons/CommonButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {
  getJoinedMeetings,
  getMeeting,
  joinMeeting,
} from '@apis/supabase/meeting';
import {MeetingInfo} from '@apis/supabase/meeting.d';
import {getCurrentAuthUser} from '@apis/supabase/auth';
import Loading from '../../components/common/skeleton/Loading';
import CommentsModal from '../../components/common/modals/CommentsModal';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import useUserMettingsApi from '@pages/MyPage/hooks/useUserMettingsApi';

const PosterImageWidth = 110;
const PosterImageHeight = PosterImageWidth * 1.1;
interface CommunityDetailProps
  extends NativeStackScreenProps<RootStackParamList, 'CommunityDetail'> {}
const CommunityDetail = ({navigation, route}: CommunityDetailProps) => {
  const [meeting, setMeeting] = useState<MeetingInfo>();
  const [error, setError] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const onPressJoinCancel = () => {
    setIsJoinModalOpen(false);
  };
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  useEffect(() => {
    fetch();
  }, [route.params.id]);

  const fetch = async () => {
    try {
      const [fetchedMeeting, joinedMeetings] = await Promise.all([
        getMeeting(route.params.id),
        getJoinedMeetings(),
      ]);
      const foundMeeting = joinedMeetings.find(
        joinedMeeting => fetchedMeeting.id === joinedMeeting.id,
      );
      if (foundMeeting) {
        setIsJoined(true);
        foundMeeting.is_owner && setIsOwner(true);
      } else {
        setIsJoined(false);
      }
      setMeeting(fetchedMeeting);
    } catch (e) {
      setError('에러가 발생했습니다.');
    }
  };
  const onPressJoinButton = async () => {
    if (!meeting) {
      return;
    }
    try {
      if (await getCurrentAuthUser()) {
        setIsJoinModalOpen(true);
      } else {
        Toast.show({text1: '로그인이 필요합니다.', type: 'info'});
        navigation.navigate('AuthHome');
      }
    } catch (e) {
      Toast.show({text1: '에러가 발생했습니다', type: 'error'});
    }
  };

  const onPressJoinConfirm = async () => {
    if (!meeting) return;
    await joinMeeting(meeting?.id);
    await fetch();

    setIsJoinModalOpen(false);
  };

  if (error) {
    // TODO: 에러 화면
    return <View />;
  }
  if (!meeting) {
    // TODO: 로딩 화면
    return <Loading />;
  }
  if (meeting) {
    const {
      title,
      introduction,
      current_occupancy,
      max_occupancy,
      meeting_at,
      perf_name,
      perf_at,
      perf_image_url,
      perf_id,
    } = meeting;

    return (
      <View style={{flex: 1}}>
        <BackHeader label={title} />
        <View style={styles.mainVisual}>
          <Image source={mainVisual} style={styles.mainImg} />
        </View>
        <View style={styles.profileImgArea}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {id: perf_id});
            }}>
            <Image
              source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${perf_image_url}`}}
              style={styles.profileImg}
            />
          </TouchableOpacity>
          <View style={styles.iconArea}>
            <TouchableOpacity
              onPress={async () => {
                await Share.share({message: `${perf_name} ${title}`});
              }}>
              <Image source={shareIcon} style={styles.icon} />
            </TouchableOpacity>
            {isJoined && (
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(!isVisible);
                }}>
                <Image source={moreIcon} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleArea}>
            <Text style={styles.title} ellipsizeMode="tail">
              {perf_name}
            </Text>
            <Text style={styles.communityTitle}>{title}</Text>
          </View>
          <View style={styles.mainContentContainer}>
            <View style={styles.scheduleContainer}>
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
            <View style={styles.meetingDescriptionContainer}>
              <Text style={styles.meetingDescriptionTitle}>모임소개</Text>
              <ScrollView>
                <Text style={styles.meetingDescriptionText}>
                  {introduction}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
        {!isJoined && (
          <View>
            {current_occupancy === max_occupancy ? (
              <CommonButton
                label="모집 완료"
                onPress={() => {}}
                disabled={true}
                bgColor={colors.GRAY_300}
              />
            ) : (
              <CommonButton label="가입하기" onPress={onPressJoinButton} />
            )}
            <CommunityJoinModal
              isJoinModalOpen={isJoinModalOpen}
              onPressJoinCancel={onPressJoinCancel}
              onPressJoinConfirm={onPressJoinConfirm}
              perf_image_url={meeting.perf_image_url}
              perf_name={meeting.perf_name}
              title={meeting.title}
              perf_at={meeting.perf_at}
              current_occupancy={meeting.current_occupancy}
              max_occupancy={meeting.max_occupancy}
              meeting_at={meeting.meeting_at}
            />
          </View>
        )}
        {isJoined && (
          // <View>
          //   <CommentView meetingId={meeting.id} />
          // </View>
          <>
            {/* <CommonButton label="댓글" onPress={() => setCommentOpen(true)} /> */}
            <TouchableOpacity
              onPress={() => setCommentOpen(true)}
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: colors.GRAY_200,
              }}>
              <View
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 30,
                    height: 4,
                    borderRadius: 4,
                    marginBottom: 10,
                    backgroundColor: colors.GRAY_300,
                  }}
                />
                <Text
                  style={{
                    color: '#333',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  댓글
                </Text>
              </View>
            </TouchableOpacity>
            <CommunityQuitModal
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              isOwner={isOwner}
              onPressEdit={() =>
                navigation.navigate('CommunitySelectLayOut', {
                  meetingId: meeting.id,
                })
              }
              id={route.params.id}
            />
            <CommentsModal
              isVisible={commentOpen}
              setIsVisible={setCommentOpen}
              meetingId={meeting.id}
            />
          </>
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  mainVisual: {
    width: '100%',
    height: 210,
    borderBottomRightRadius: 16,
  },
  mainImg: {
    width: '100%',
    height: 210,
  },
  profileImgArea: {
    borderRadius: 16,
    zIndex: 5,
  },
  profileImg: {
    borderRadius: 16,
    position: 'absolute',
    top: -PosterImageHeight / 2,
    left: 16,
    width: PosterImageWidth,
    height: PosterImageHeight,
  },
  iconArea: {
    position: 'absolute',
    top: -30,
    right: 13,
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  mainContainer: {flex: 1, paddingHorizontal: 16},
  titleArea: {
    width: '80%',
    marginTop: 16,
    marginLeft: PosterImageWidth + 16,
    gap: 4,
  },
  titleStyle: {
    alignItems: 'flex-start',
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
  },
  mainContentContainer: {flex: 1},
  scheduleContainer: {
    backgroundColor: colors.GRAY_100,
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 24,
    marginVertical: 16,
    gap: 8,
  },
  scheduleSection: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  scheduleLabel: {color: colors.MAIN_COLOR, fontWeight: 'bold'},
  scheduleDateTime: {color: colors.GRAY_400, fontWeight: '700'},
  peopleLabel: {
    color: colors.GRAY_400,
  },
  peopleCount: {
    color: colors.GRAY_400,
  },
  meetingDescriptionContainer: {
    flex: 1,
    marginBottom: 8,
  },
  meetingDescriptionTitle: {
    color: colors.GRAY_600,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
  },
  meetingDescriptionText: {
    color: colors.GRAY_500,
  },
});
export default CommunityDetail;
const mainVisual = require('../../assets/images/community/community_img.png');
const shareIcon = require('../../assets/icons/share_icon.png');
const moreIcon = require('../../assets/icons/more_icon.png');
