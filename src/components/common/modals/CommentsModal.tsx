import React, {useState, useCallback} from 'react';
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
} from 'react-native';
import Modal from 'react-native-modal';

const moreIcon = require('../../assets/icons/more.png');

interface Comment {
  id: number;
  name: string;
  contents: string;
  profileImg: string;
}

const dummy_comments: Comment[] = [
  {
    id: 1,
    name: 'newjeans',
    contents: '와 잘 봤어요!',
    profileImg: 'https://picsum.photos/seed/picsum/60/60',
  },
  {
    id: 2,
    name: 'mimi',
    contents: '정말 멋있네요',
    profileImg: 'https://picsum.photos/seed/picsum/60/60',
  },
];

interface CommentItemProps {
  item: Comment;
  index: number;
}

const CommentItem: React.FC<CommentItemProps> = ({item, index}) => {
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
            source={{uri: item.profileImg}}
            style={{width: 32, height: 32, borderRadius: 25, marginRight: 8}}
          />
          <View style={{flex: 1, rowGap: 3}}>
            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize: 13}}>{item.name}</Text>
              <Text style={{color: '#6d6d6d', fontSize: 12}}>24분전</Text>
            </View>
            <Text style={{color: '#000', fontSize: 15}}>{item.contents}</Text>
          </View>
          <TouchableOpacity>
            <Image source={moreIcon} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface CommentsModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const [textValue, setTextValue] = useState<string>('');
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const renderItem = useCallback(
    ({item, index}: {item: Comment; index: number}) => (
      <CommentItem item={item} index={index} />
    ),
    [],
  );
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={300}
      backdropColor="#000"
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //os별로 다르게 준다
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
              <Text style={{color: '#333'}}>댓글</Text>
            </View>
            <FlatList
              data={dummy_comments}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 32}} />}
              style={{flex: 1}}
              // ListEmptyComponent={}
            />
          </View>

          {/* 댓글 입력 */}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#EEE',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 12,
                marginTop: 16,
                marginBottom: 24,
                minHeight: 40,
                maxHeight: 130,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#b1b1b1',
              }}>
              <TextInput
                style={{
                  minHeight: 23,
                  maxHeight: 80,
                  paddingVertical: 0,
                  lineHeight: 18,
                  fontSize: 15,
                  color: '#3A3A3A',
                }}
                multiline
                maxLength={200}
                placeholder="댓글을 입력해주세요"
                placeholderTextColor="#BBB"
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                value={textValue}
                onChangeText={text => setTextValue(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginBottom: 28,
                opacity: 0.5,
              }}></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;
