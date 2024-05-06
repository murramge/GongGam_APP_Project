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
import Login from '@pages/Login';
import CommunitySelect from './pages/CommunitySelect/ArtSelectFirstStap';
import NewPassword from './template/Sign/NewPasswordPage';
import FindPassword from './template/Sign/FindPasswordPage';
import CommunityDetail from './template/Community/CommunityDetail';
import CommunityTemplates from './template/Community/CommunityTemplates';
import ArtDaysTwoStap from '@pages/CommunitySelect/ArtDaysTwoStap';
import ArtTimesThreeStap from '@pages/CommunitySelect/ArtTimesThreeStap';
import CommunityDateSelect from '@pages/CommunitySelect/CommunityDateSelectFourStap';
import CommunityIntroduce from '@pages/CommunitySelect/CommunityIntroduceFiveStap';
import CommunitySummary from '@pages/CommunitySelect/CommunitySummaryLastStap';
import CommunitySelectLayOut from '@components/CommunitySelectLayOut';
import Splash from '@pages/Splash';
import MeetingIntroduce from '@pages/CommunitySelect/CommunityIntroduce';
import MyPage from '@pages/MyPage';
import AuthHome from '@pages/AuthHome';
import SignUp from '@pages/SignUp';
import ProfileEdit from '@pages/ProfileEdit';
import Setting from '@pages/Setting';

export type RootStackParamList = {
  MainTab: undefined;
  Detail: {
    id: string;
  };
  CommunityDetail: {
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
  CommunitySelect: undefined;
  CommunitySelectTwoStap: undefined;
  CommunitySelectThreeStap: undefined;
  CommunitySelectFourStap: undefined;
  CommunitySelectFiveStap: undefined;
  CommunitySelectLastStap: undefined;
  NewPasswordPage: {
    code: string;
  };
  FindPasswordPage: undefined;
  CommunitySelectLayOut: undefined;
  Login: undefined;
  ProfileEdit: undefined;
  Settings: undefined;
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
      <Tab.Screen name="Community" component={CommunityTemplates} />
      <Tab.Screen name="Calendar" component={AuthHome} />
      <Tab.Screen name="Profile" component={MyPage} />
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

      <Stack.Screen name="CommunitySelect" component={CommunitySelect} />
      <Stack.Screen name="CommunitySelectTwoStap" component={ArtDaysTwoStap} />
      <Stack.Screen
        name="CommunitySelectThreeStap"
        component={ArtTimesThreeStap}
      />
      <Stack.Screen
        name="CommunitySelectFourStap"
        component={CommunityDateSelect}
      />
      <Stack.Screen
        name="CommunitySelectFiveStap"
        component={CommunityIntroduce}
      />
      <Stack.Screen
        name="CommunitySelectLastStap"
        component={CommunitySummary}
      />
      <Stack.Screen
        name="CommunitySelectLayOut"
        component={CommunitySelectLayOut}
      />

      <Stack.Screen
        name="PerformanceSearchResult"
        component={SearchResultPage}
      />
      <Stack.Screen name="NewPasswordPage" component={NewPassword} />
      <Stack.Screen name="FindPasswordPage" component={FindPassword} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Settings" component={Setting}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default Router;
