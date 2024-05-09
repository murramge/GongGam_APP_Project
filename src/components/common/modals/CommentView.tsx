import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  PanResponder,
  Dimensions,
  //Animated,
} from 'react-native';
import dayjs from 'dayjs';
import {colors} from '@styles/color';
import {getMeetingComments} from '@apis/supabase/comment';
import type {
  Comment,
  CommentValue,
  createMeetingCommentParams,
} from '@apis/supabase/comment.d';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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

export const CommentItem = ({
  id,
  content,
  created_at,
  profile,
}: CommentItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
        paddingHorizontal: 30,
        width: '100%',
        columnGap: 6,
        borderBottomWidth: 1,
        borderColor: colors.GRAY_200,
      }}>
      <Image
        source={{
          uri: profile.image_url || 'https://avatar.iran.liara.run/public',
        }}
        style={{width: 32, height: 32, borderRadius: 16}}
      />
      <View style={{flex: 1, rowGap: 3}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
          <Text style={{fontSize: 13}}>{profile.nickname || '사용자'}</Text>
          <Text style={{fontSize: 12, color: '#333'}}>{created_at}</Text>
        </View>
        <Text style={{color: '#333', fontSize: 15}}>{content}</Text>
      </View>
    </View>
  );
};

const CommentView = ({meetingId}: {meetingId: number}) => {
  const [textValue, setTextValue] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const animation = useSharedValue(100); // Default height when closed
  const maxHeight = 800;
  const minHeight = 100;
  const openGestureY = 400;
  const closeGesturY = 1000;
  const gestureHeight = -100; //얼만큼 손을 올려야지 올라갈건지
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      animation.value = withSpring(maxHeight, {damping: 100});
    } else {
      animation.value = withSpring(minHeight, {damping: 100});
    }
  }, [open]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startHeight = animation.value;
    },
    onActive: (event, ctx) => {
      let newHeight = ctx.startHeight - event.translationY;
      if (newHeight > 1200) {
        newHeight = 1200;
      }
      if (newHeight < 100) {
        newHeight = 100;
      }
      animation.value = newHeight;
    },
    onEnd: event => {
      if (
        event.translationY < gestureHeight ||
        animation.value > screenHeight - openGestureY
      ) {
        animation.value = withTiming(1200, {duration: 300});
        runOnJS(setOpen)(true);
      } else {
        runOnJS(setOpen)(false);
        if (animation.value !== 1200 && animation.value !== 300) {
          animation.value = withTiming(300, {duration: 300});
        }
      }
    },
  });

  const boxStyle = useAnimatedStyle(() => {
    return {
      height: animation.value,
    };
  });

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

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Text>댓글</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 99,
          bottom: 0,
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          borderColor: '#C9C9C9',
        }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[boxStyle, {width: screenWidth}]}>
              <View
                style={{
                  paddingTop: 12,
                  // backgroundColor: colors.BLACK,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 5,
                    backgroundColor: colors.MAIN_COLOR,
                    borderRadius: 8,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.MAIN_COLOR,
                    paddingBottom: 100,
                    fontWeight: '700',
                    fontSize: 16,
                    paddingTop: 10,
                  }}>
                  댓글
                </Text>
                <View style={{backgroundColor: colors.WHITE}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 16}} />}
                    style={{flex: 1}}
                  />
                </View>
                {/* 댓글입력 */}
                {!runOnJS(setOpen) && (
                  <>
                    <View
                      style={{
                        backgroundColor: colors.GRAY_200,
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 0,
                      }}>
                      <Image
                        source={{uri: 'https://avatar.iran.liara.run/public'}}
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

                      <TouchableOpacity onPress={() => console.log(textValue)}>
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
                  </>
                )}
                {/* 입력종료 */}
              </View>
              <View style={{padding: 20}}>
                <Text></Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

export default CommentView;
