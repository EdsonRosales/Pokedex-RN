import React from 'react'
import { Text, View } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParams } from '../navigator/Navigator';

interface PokemonScreenProps extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ({ navigation, route }: PokemonScreenProps) => {

  const { simplePokemon, color } = route.params;

  return (
    <View>
      <Text>{simplePokemon.name} - {color}</Text>
    </View>
  )
};
