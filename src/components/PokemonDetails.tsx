import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

type PokemonDetailsProps = {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {/* Types & weight container */}
      <View
        style={{
          ...styles.container,
          marginTop: 380
        }}
      >
        {/* Types */}
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

        {/* Weight */}
        <Text style={ styles.title }>Weight</Text>
        <Text style={ styles.regularText }>{ pokemon.weight }lb</Text>
      </View>

      {/* Sprites Container */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Sprites</Text>
      </View>

      <ScrollView
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
      >
        <FadeInImage
          uri={ pokemon.sprites.front_default }
          style={ styles.basicSprite }
        />
        <FadeInImage
          uri={ pokemon.sprites.back_default }
          style={ styles.basicSprite }
        />
        <FadeInImage
          uri={ pokemon.sprites.front_shiny }
          style={ styles.basicSprite }
        />
        <FadeInImage
          uri={ pokemon.sprites.back_shiny }
          style={ styles.basicSprite }
        />
      </ScrollView>

      {/* Skills Container */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Base Skills</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text 
                key={ ability.name }
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
              >
                { ability.name }
              </Text>
            ))
          }
        </View>
      </View>

      {/* Stats Container */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Stats</Text>
        <View>
          {
            pokemon.stats.map(( stat, index ) => (
              <View 
                key={ stat.stat.name + index }
                style={{ flexDirection: 'row' }}
              >
                <Text
                  style={{
                    ...styles.regularText,
                    marginRight: 10,
                    width: 150
                  }}
                >
                  { stat.stat.name }
                </Text>

                <Text
                  style={{
                    ...styles.regularText,
                    fontWeight: 'bold'
                  }}
                >
                  { stat.base_stat }
                </Text>
              </View>
            ))
          }
        </View>
      </View>

      {/* Moves Container */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Moves</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            pokemon.moves.map(({ move }) => (
              <Text 
                key={ move.name }
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
              >
                { move.name }
              </Text>
            ))
          }
        </View>
        {/* Final Sprite */}
        <View style={{
          marginBottom: 40,
          alignItems: 'center'
        }}>
          <FadeInImage
            uri={ pokemon.sprites.front_shiny }
            style={ styles.basicSprite }
          />
        </View>
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
    fontWeight: 'bold',
    marginTop: 20
  },
  regularText: {
    fontSize: 18,
  },
  basicSprite: {
    width: 100,
    height: 100
  }
});
