import React, {useState, useCallback, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Keyboard,
  Dimensions,
} from 'react-native';
import {colors} from '@styles/color';
import Config from 'react-native-config';
import useProfileApi from '../../../pages/MyPage/hooks/useProfileApi';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import {getMeetingComments, createMeetingComment} from '@apis/supabase/comment';

export interface CommentItemProps {
  id: number;
  content: string;
  created_at: string;
  //reply_of: number;
  profile: {
    nickname: string;
    image_url?: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  created_at,
  profile,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        columnGap: 6,
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
              uri: profile.image_url || 'https://avatar.iran.liara.run/public',
            }}
            style={{width: 32, height: 32, borderRadius: 25, marginRight: 8}}
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
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const screenWidth = Dimensions.get('window').width;
  const renderItem = useCallback(
    ({item}: {item: Comment}) => (
      <CommentItem
        id={item.id}
        content={item.content}
        created_at={dayjs(item.created_at).format('YY년 MM월 DD일 HH시 mm분')}
        profile={item.profile}
      />
    ),
    [],
  );
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeetingComments(meetingId);
        console.log(data);
        console.log(data[0].profile.nickname);
        if (data) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [meetingId]);

  const {profile, user} = useProfileApi();

  const submitComment = async () => {
    textValue
      ? await createMeetingComment({meetingId, content: textValue})
      : console.log('댓글을 입력해주세요');
    setTextValue('');
  };
  console.log('comment:', comments);

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
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={8}
        style={{width: '100%'}}>
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 16,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 1.5,
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
            <View style={{height: 30, justifyContent: 'center'}}>
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
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 32}} />}
              style={{flex: 1}}
            />
          </View>

          {/*댓글입력 시작 */}
          <View
            style={{
              backgroundColor: colors.GRAY_200,
              flexDirection: 'row',
              paddingHorizontal: 20,
              width: screenWidth,
              paddingVertical: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}>
            <Image
              source={{
                uri: profile?.image_url
                  ? `${Config.SUPABASE_PUBLIC_IMAGE_BASE_URL}/${profile?.image_url}`
                  : 'https://avatar.iran.liara.run/public',
              }}
              //
              style={{width: 32, height: 32}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                backgroundColor: colors.WHITE,
                borderRadius: 4,
                width: 270,
                height: 36,
              }}>
              <TextInput
                style={{
                  minHeight: 23,
                  maxHeight: 80,
                  paddingVertical: 0,
                  lineHeight: 18,
                  fontSize: 15,
                  textAlignVertical: 'center',
                }}
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
            </View>

            <TouchableOpacity onPress={submitComment}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.BLACK,
                }}>
                등록
              </Text>
            </TouchableOpacity>
          </View>
          {/* 댓글 입력 끝*/}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;
