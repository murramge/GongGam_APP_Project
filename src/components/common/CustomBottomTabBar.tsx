import React, {useCallback} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {getCurrentAuthUser} from '@apis/supabase/auth';
import {BOTTOM_TAB_HEIGHT} from '@styles/common';

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
      const color = isFocused ? '#3544C4' : '#aaa';

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
            <FontistoIcon name={name} size={28} color={color} />
          ) : type === 'ion' ? (
            <IonIcon name={name} size={28} color={color} />
          ) : type === 'material' ? (
            <MaterialIcon name={name} size={28} color={color} />
          ) : type === 'materialCommunity' ? (
            <MaterialCommunityIcon name={name} size={28} color={color} />
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
              onPress: async () => {
                const user = await getCurrentAuthUser();
                if (!user && routeName === 'Profile') {
                  navigation.navigate('AuthHome');
                  return;
                }
                navigation.navigate(routeName);
              },
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
    iconType: 'materialCommunity',
    iconName: 'account-group',
  },
  Calendar: {
    iconType: 'material',
    iconName: 'edit-calendar',
  },
  Profile: {
    iconType: 'ion',
    iconName: 'person',
  },
};

type IconType = 'fontisto' | 'materialCommunity' | 'ion' | 'material';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    width,
    height: BOTTOM_TAB_HEIGHT,
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
    width: BOTTOM_TAB_HEIGHT * 0.52,
    height: BOTTOM_TAB_HEIGHT * 0.52,
    borderRadius: 100,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBottomTabBar;
