import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import 'react-native-get-random-values';
import {v4} from 'uuid';

interface CustomBottomTabBarProps extends BottomTabBarProps {}

const CustomBottomTabBar = ({navigation, state}: CustomBottomTabBarProps) => {
  const {routeNames} = state;
  const currentRouteName = routeNames[state.index];

  const renderTabButton = useCallback(
    ({
      type,
      name,
      isFocused,
      onPress,
    }: {
      type: IconType;
      name: string;
      isFocused: boolean;
      onPress: () => void;
    }) => {
      return (
        <Pressable
          key={v4()}
          hitSlop={{
            bottom: 16,
            top: 16,
            left: 16,
            right: 16,
          }}
          style={[
            styles.tabButton,
            {
              elevation: isFocused ? 4 : 0,
            },
          ]}
          onPress={onPress}>
          {type === 'fontisto' ? (
            <FontistoIcon
              name={name}
              size={28}
              color={isFocused ? '#3544C4' : '#aaa'}
            />
          ) : type === 'ion' ? (
            <IonIcon
              name={name}
              size={28}
              color={isFocused ? '#3544C4' : '#aaa'}
            />
          ) : type === 'material' ? (
            <MaterialIcon
              name={name}
              size={28}
              color={isFocused ? '#3544C4' : '#aaa'}
            />
          ) : (
            <></>
          )}
        </Pressable>
      );
    },
    [],
  );

  return (
    <View>
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {routeNames.map(routeName =>
            renderTabButton({
              type: routeInfo[routeName]?.iconType ?? 'ion',
              name: routeInfo[routeName]?.iconName ?? 'alert-circle',
              isFocused: currentRouteName === routeName,
              onPress: () => navigation.navigate(routeName),
            }),
          )}
        </View>
      </View>
    </View>
  );
};

const routeInfo: {
  [key: string]: {
    iconType: IconType;
    iconName: string;
  };
} = {
  Performance: {
    iconType: 'fontisto',
    iconName: 'film',
  },
  Community: {
    iconType: 'material',
    iconName: 'account-group',
  },
  Profile: {
    iconType: 'ion',
    iconName: 'person',
  },
};

type IconType = 'fontisto' | 'material' | 'ion';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    width,
    height: 100,
    padding: 16,
  },
  tabBar: {
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: 'grey',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabButton: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBottomTabBar;
