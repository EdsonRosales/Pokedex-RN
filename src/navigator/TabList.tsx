import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

import type { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonScreen: { simplePokemon: SimplePokemon, color: string };
}

const TabList = createStackNavigator<RootStackParamList>();

export const TabListScreen = () => {
  return (
    <TabList.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white"
        }
      }}
    >
      <TabList.Screen name="HomeScreen" component={ HomeScreen } />
      <TabList.Screen name="PokemonScreen" component={ PokemonScreen } />
    </TabList.Navigator>
  );
}