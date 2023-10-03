import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Navigator } from './Navigator';
import { SearchScreen } from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: 10
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255, 0.85)',   // <--- Transparency effect
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 50
        }
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={ Navigator }
        options={{
            tabBarLabel: "List",
            tabBarIcon: ({ color }) => <Icon color={ color } size={ 25 } name='list-outline' />
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={ SearchScreen }
        options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => <Icon color={ color } size={ 25 } name='search-outline' />
        }}
      />
    </Tab.Navigator>
  );
}