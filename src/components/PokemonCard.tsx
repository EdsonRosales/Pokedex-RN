import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

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

        {/* Solve the problem with the overflow of pokemon & pokeball images */}
        <View
          style={ styles.pokebolaContainer }
        >
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={ styles.pokebola }
          />
        </View>


        {/* Mount the pokemon image */}
        <FadeInImage
          uri={ pokemon.picture }
          style={ styles.pokemonImage }
        />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5
  }
});
