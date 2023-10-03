import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { PokemonFull } from '../interfaces/pokemonInterfaces';

type PokemonDetailsProps = {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {/* Types container */}
      <View
        style={{
          ...styles.container,
          marginTop: 390
        }}
      >
        <Text style={ styles.title }>Types</Text>
        <View style={{ flexDirection: 'row' }}>  
          {
            pokemon.types.map(({ type }) => (
              <Text 
                key={ type.name }
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
              >
                { type.name }
              </Text>
            ))
          }
        </View>
      </View>

      {/* Sprites Container */}
      <View
        style={{
          ...styles.container,
          marginTop: 20
        }}
      >
        <Text style={ styles.title }>Sprites</Text>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  regularText: {
    fontSize: 18,
  }
});
