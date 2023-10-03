import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

type PokemonCardProps = {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={ 0.7 }
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4
      }}>
        {/* Pokemon's name */}
        <View>
          <Text style={ styles.name }>
            { pokemon.name }
            { '\n#' + pokemon.id }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  }
});
