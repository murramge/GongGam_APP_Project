import React, {useState, useCallback, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
  Dimensions,
} from 'react-native';
import {colors} from '@styles/color';
import Config from 'react-native-config';
import useProfileApi from '../../../pages/MyPage/hooks/useProfileApi';
import ConfirmModal from './ConfirmModal';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';

import {
  getMeetingComments,
  createMeetingComment,
  deleteMeetingComment,
} from '@apis/supabase/comment';
import {getProfile} from '@apis/supabase/profile';

export interface CommentItemProps {
  id: number;
  content: string;
  created_at: string;
  //reply_of: number;
  profile: {
    nickname: string;
    image_url?: string;
    user_id: string;
  };
  onPressDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  created_at,
  profile,
  onPressDelete,
}) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isMycomment, setIsMyComment] = useState(false);

  const fetchMyProfile = async () => {
    try {
      const myProfile = await getProfile();
      profile.user_id === myProfile.user_id
        ? setIsMyComment(true)
        : setIsMyComment(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  fetchMyProfile();

  const onDeleteComment = () => {
    setIsConfirmModalVisible(true);
  };

  const onConfirmDelete = async () => {
    deleteMeetingComment(id);
    setIsConfirmModalVisible(false);
    await fetchData();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        columnGap: 6,
        paddingLeft: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: profile?.image_url
                ? `${Config.SUPABASE_PUBLIC_IMAGE_BASE_URL}/${profile?.image_url}`
                : 'https://avatar.iran.liara.run/public',
            }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 100,
              marginHorizontal: 10,
            }}
          />
          <View style={{flex: 1, rowGap: 3}}>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                {profile.nickname || '사용자'}
              </Text>
              <Text style={{color: '#6d6d6d', fontSize: 12}}>{created_at}</Text>
            </View>
            <Text style={{color: '#000', fontSize: 15}}>{content}</Text>
          </View>
          {isMycomment && (
            <TouchableOpacity
              style={{paddingHorizontal: 20}}
              onPress={onDeleteComment}>
              <Text style={{color: colors.GRAY_300}}>삭제</Text>
              <ConfirmModal
                message={'댓글을 삭제하시겠습니까?'}
                isVisible={isConfirmModalVisible}
                onConfirm={async () => {
                  onPressDelete();
                  setIsConfirmModalVisible(false);
                }}
                onCancel={() => setIsConfirmModalVisible(false)}
              />
            </TouchableOpacity>
          )}
          {/* isMycomment 조건 끝 */}
        </View>
      </View>
    </View>
  );
};

interface CommentsModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  meetingId: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isVisible,
  setIsVisible,
  meetingId,
}) => {
  const [textValue, setTextValue] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return () => Keyboard.removeAllListeners('keyboardDidShow');
  });

  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const screenWidth = Dimensions.get('window').width;

  const commentFlatListRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({item}: {item: Comment}) => (
      <CommentItem
        id={item.id}
        content={item.content}
        created_at={dayjs(item.created_at).format('YY년 MM월 DD일 HH시 mm분')}
        profile={item.profile}
        onPressDelete={async () => {
          await deleteMeetingComment(item.id);
          fetchData();
        }}
      />
    ),
    [],
  );

  const [comments, setComments] = useState<Comment[]>([]);
  const fetchData = async () => {
    try {
      const data = await getMeetingComments(meetingId);

      if (data) {
        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [meetingId]);

  const {profile, user} = useProfileApi();

  const submitComment = async () => {
    textValue
      ? await createMeetingComment({meetingId, content: textValue})
      : console.log('댓글을 입력해주세요');
    setTextValue('');
    fetchData();
  };

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={300}
      backdropColor={colors.BLACK}
      backdropOpacity={0.4}
      style={{
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      onBackdropPress={() => {
        Keyboard.dismiss();
        setIsVisible(!isVisible);
      }}
      onBackButtonPress={() => {
        Keyboard.dismiss();
        setIsVisible(!isVisible);
      }}
      hideModalContentWhileAnimating>
      <View style={{width: '100%'}}>
        <View
          style={{
            paddingTop: 20,
            width: SCREEN_WIDTH,
            height: keyboardHeight
              ? SCREEN_HEIGHT - keyboardHeight
              : SCREEN_HEIGHT / 1.5,
            backgroundColor: '#FFF',
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          }}>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 16,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 30,
                height: 4,
                borderRadius: 4,
                backgroundColor: '#EEE',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
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
            {comments.length === 0 ? (
              <Text style={{padding: 16}}>
                등록된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요.
              </Text>
            ) : (
              <FlatList
                ref={commentFlatListRef}
                data={comments}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height: 32}} />}
                style={{flex: 1}}
              />
            )}
          </View>

          {/*댓글입력 시작 */}
          <View
            style={{
              backgroundColor: colors.GRAY_200,
              flexDirection: 'row',
              paddingHorizontal: 20,
              width: screenWidth,
              paddingVertical: 20,
              //justifyContent: 'space-between',

              bottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.WHITE,
                borderRadius: 4,
                width: SCREEN_WIDTH - 40,
                height: 36,
              }}>
              <TextInput
                style={{
                  minHeight: 23,
                  maxHeight: 80,
                  paddingVertical: 0,
                  paddingRight: 70,
                  lineHeight: 18,
                  fontSize: 15,
                  padding: 16,
                  textAlignVertical: 'center',
                  color: colors.BLACK,
                }}
                onFocus={() => commentFlatListRef.current?.scrollToEnd()}
                multiline
                maxLength={200}
                placeholder="댓글을 입력해주세요."
                placeholderTextColor={colors.GRAY_300}
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                value={textValue}
                onChangeText={text => setTextValue(text)}
              />
              {textValue && (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.MAIN_COLOR,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                    position: 'absolute',
                    right: 16,
                  }}
                  onPress={submitComment}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: colors.WHITE,
                    }}>
                    등록
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* 댓글 입력 끝*/}
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;
