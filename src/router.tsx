import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@pages/Home';
import CustomBottomTabBar from '@components/CustomBottomTabBar';
import DetailPage from './template/home/DetailPage';

import TicketingPage from './template/home/TicketingPage';

import Search from '@pages/Search';

import SearchResultPage from './template/home/SearchResultPage';
import SignUpTemplate from './template/Sign/SignUpTemplate';

export type RootStackParamList = {
  MainTab: undefined;
  Detail: {
    id: string;
  };
  Search: undefined;
  Ticketing: undefined;
};

export type MainBottomTabParamList = {
  Performance: undefined;
  Community: undefined;
  Calendar: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const MainTab = () => {
  const renderTabBar = (props: BottomTabBarProps) => (
    <CustomBottomTabBar {...props} />
  );
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Performance" component={Home} />
      <Tab.Screen name="Community" component={SignUpTemplate} />
      <Tab.Screen name="Calendar" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Ticketing" component={TicketingPage} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default Router;
