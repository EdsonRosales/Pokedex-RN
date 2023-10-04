import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParams } from '../navigator/TabList';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface PokemonScreenProps extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ({ navigation, route }: PokemonScreenProps) => {

  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  // Get the complete info of pokemons with the custom hook
  const { isLoading, pokemon: completePokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Container (Pokemon's Info) */}
      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>
        {/* Go Back button */}
        <TouchableOpacity
          onPress={ () => navigation.pop() }
          activeOpacity={ 0.8 }
          style={{
            ...styles.goBackButton,
            top: top + 6
          }}
        >
          <Icon
            name="arrow-back-outline"
            color="white"
            size={ 35 }
          />
        </TouchableOpacity>

        {/* Pokemon's name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 45
          }}
        >
          { name + '\n' }#{ id }
        </Text>

        {/* White pokeball background */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={ styles.pokeball }
        />

        {/* Pokemon Image */}
        <FadeInImage
          uri={ picture }
          style={ styles.pokemonImage }
        />
      </View>

      {/* Loader & Details of pokemon */}
      {
        isLoading ?
        (
          <View style={ styles.loadingIndicator }>
            <ActivityIndicator
              color={ color }
              size={ 50 }
            />
          </View>
        ) : <PokemonDetails pokemon={ completePokemon } />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,  // <--- TODO: Calculate the height based on screen proportions
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  goBackButton: {
    position: 'absolute',
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -25,
    opacity: 0.5
  },
  pokemonImage: {
    width: 230,
    height: 230,
    position: 'absolute',
    bottom: -20
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
