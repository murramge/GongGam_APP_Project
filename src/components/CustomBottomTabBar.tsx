import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-get-random-values';
import {v4} from 'uuid';

interface CustomBottomTabBarProps extends BottomTabBarProps {}

const CustomBottomTabBar = ({navigation, state}: CustomBottomTabBarProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const renderTabButton = ({
    name,
    isFocused,
    onPress,
  }: {
    name: string;
    isFocused: boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        key={v4()}
        hitSlop={{
          bottom: 16,
          top: 16,
          left: 16,
          right: 16,
        }}
        style={{
          width: 52,
          height: 52,
          elevation: isFocused ? 4 : 0,
          borderRadius: 100,
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Icon name={name} size={28} color={isFocused ? '#3544C4' : '#aaa'} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'transparent',
          width,
          height: 100,
          padding: 16,
        }}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: '#fff',
            elevation: 4,
            shadowColor: 'grey',
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {routeNames.map((routeName, index) =>
            renderTabButton({
              name: routeName,
              isFocused: index === currentIndex,
              onPress: () => setCurrentIndex(index),
            }),
          )}
        </View>
      </View>
    </View>
  );
};

const routeNames = ['film-outline', 'people', 'chatbox-sharp', 'person'];

export default CustomBottomTabBar;
