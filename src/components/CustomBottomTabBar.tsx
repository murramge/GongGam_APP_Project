import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useRef, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-get-random-values';
import {v4} from 'uuid';

interface CustomBottomTabBarProps extends BottomTabBarProps {}

const CustomBottomTabBar = ({navigation, state}: CustomBottomTabBarProps) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const valuesOf = [tab1Value, tab2Value, tab3Value, tab4Value];
  const a = 1;

  const renderTabButton = (name: string, index: number) => {
    const isFocused = currentIndex === index;
    const onPress = () => {
      setCurrentIndex(index);
      Animated.timing(valuesOf[index], {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
      }).start();
    };
    return (
      <Animated.View
        key={v4()}
        style={{
          width: 52,
          height: 52,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF',
          elevation: valuesOf[index],
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          hitSlop={{
            bottom: 10,
            top: 10,
            left: 16,
            right: 16,
          }}
          onPress={onPress}>
          <Icon name={name} size={28} color={isFocused ? '#3544C4' : '#aaa'} />
        </TouchableOpacity>
      </Animated.View>
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
          {routeNames.map(renderTabButton)}
        </View>
      </View>
    </View>
  );
};

const routeNames = ['film-outline', 'people', 'chatbox-sharp', 'person'];

export default CustomBottomTabBar;
