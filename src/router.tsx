
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home.tsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainTab = () => {
  return (
    <Tab.Navigator  screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTab}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default Router;
