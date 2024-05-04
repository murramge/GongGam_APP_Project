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

import {AreaCodeKey, PerformanceGenreKey} from '@apis/kopis.d';

import SignUp from '@pages/SignUp';
import Login from '@pages/Login';
import Splash from '@pages/Splash';
import AuthHome from '@pages/AuthHome';
import Community from '@pages/Community';
import NewPassword from './template/Sign/NewPasswordPage';
import FindPassword from './template/Sign/FindPasswordPage';
import CommunitySelect from './template/Community/CommunitySelect';
import CommunityDetail from './template/Community/CommunityDetail';
import CommunityTemplates from './template/Community/CommunityTemplates';
import MeetingIntroduce from '@pages/communitySelect/CommunityIntroduce';

export type RootStackParamList = {
  MainTab: undefined;
  Detail: {
    id: string;
  };
  SignUp: undefined;
  Search: undefined;
  Ticketing: undefined;
  PerformanceSearchResult: {
    date: string;
    performanceName?: string;
    genreCode?: PerformanceGenreKey;
    signguCode?: AreaCodeKey;
  };
  Splash: undefined;
  NewPasswordPage: {
    code: string;
  };
  FindPasswordPage: undefined;
  Login: undefined;
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
      <Tab.Screen name="Community" component={CommunitySelect} />
      <Tab.Screen name="Calendar" component={Login} />
      <Tab.Screen name="Profile" component={SignUp} />
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Ticketing" component={TicketingPage} />

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="PerformanceSearchResult"
        component={SearchResultPage}
      />
      <Stack.Screen name="NewPasswordPage" component={NewPassword} />
      <Stack.Screen name="FindPasswordPage" component={FindPassword} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default Router;
