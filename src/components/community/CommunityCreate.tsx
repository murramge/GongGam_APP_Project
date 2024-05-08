import {useNavigation} from '@react-navigation/native';
import {colors} from '@styles/color';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CommunityCreate = () => {
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
      }}>
      <TouchableOpacity onPress={() => navigate('CommunitySelectLayOut')}>
        <View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              padding: 10,
              borderWidth: 1,
              borderColor: colors.GRAY_200,
              borderRadius: 10,
            }}>
            <LottieView
              source={require('@lotties/sample.json')}
              style={{width: 100, height: 100}}
              autoPlay
              loop
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16, color: colors.BLACK}}>
                <Text style={{fontWeight: '700'}}>함께 볼 사람</Text>을
                구해보세요!
              </Text>
              <Text style={{fontSize: 11}}>
                공연의 감동을 함께 나눌 사람을 찾아봐요
              </Text>
            </View>
            <View style={{justifyContent: 'center', padding: 10}}>
              <Icon name="right" size={25} color={colors.GRAY_400}></Icon>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunityCreate;
