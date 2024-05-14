import {colors} from '@styles/color';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import {kakaoSignIn} from '@apis/supabase/auth';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

interface AuthHomeProps
  extends NativeStackScreenProps<RootStackParamList, 'AuthHome'> {}

const AuthHome = ({route}: AuthHomeProps) => {
  const [isEmailConfirmModalVisible, setIsEmailConfirmModalVisible] =
    useState(false);
  const {navigate, goBack} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!route.params) {
      return;
    }

    if ('type' in route.params && route.params.type === 'signup') {
      Toast.show({
        text1: '이메일 인증이 완료되었습니다!',
        type: 'success',
      });
      navigate('Login');
    } else if ('error' in route.params) {
      setIsEmailConfirmModalVisible(true);
    }
  }, [route.params, route.path]);

  const onPressKakaoButton = async () => {
    try {
      await kakaoSignIn();

      goBack();
    } catch (e) {}
  };

  return (
    <>
      <View style={styles.container}>
        <LottieView
          source={require('@lotties/join.json')}
          style={{width: 150, height: 150}}
          autoPlay
          loop
        />
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
        <TouchableOpacity style={styles.button}>
          <CommonButton
            label="회원가입"
            onPress={() => {
              navigate('SignUp');
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('Login');
          }}
          style={styles.authArea}>
          <Text style={styles.authText}>
            회원이신가요? <Text style={styles.pointText}>로그인하기</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.snsInfoArea}>
          <View style={styles.line} />
          <Text style={styles.snsInfoText}>소셜 로그인 하기</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.iconArea}>
          <TouchableOpacity onPress={onPressKakaoButton}>
            <Image source={kakaoIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isEmailConfirmModalVisible}
        onBackdropPress={() => setIsEmailConfirmModalVisible(false)}>
        <Text>{'인증 메일이 만료되었거나 유효하지 않습니다.'}</Text>
        <TouchableOpacity>
          <Text>인증메일 재전송</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEmailConfirmModalVisible(false)}>
          <Text>취소</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: 200,
    height: 42,
    marginBottom: 80,
  },
  button: {
    width: '90%',
    marginHorizontal: 24,
  },
  authArea: {
    alignItems: 'center',
  },
  authText: {
    marginTop: 22,
    color: colors.GRAY_300,
    fontSize: 15,
    marginBottom: 50,
  },
  pointText: {
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  snsInfoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    width: 62,
    height: 1,
    borderTopWidth: 0.5,
    borderColor: colors.BLACK,
    backgroundColor: colors.BLACK,
  },
  snsInfoText: {
    color: colors.GRAY_300,
    fontSize: 14,
  },
  iconArea: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 28,
  },
  icon: {
    width: 200,
    height: 50,
  },
});

export default AuthHome;

const logo = require('@images/logo.png');
const kakaoIcon = require('@icons/kakao_btn.png');
