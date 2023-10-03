import React, { useEffect, useRef, useState } from 'react'
import { 
  Dimensions, 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

import ImageColors from "react-native-image-colors";

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';

type PokemonCardProps = {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {

  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);   // <--- Ref to know wheter the component is mounted or not
  // Navigation
  const navigation = useNavigation();

  // Effect to dispatch the action to change the background color of the Card component
  useEffect(() => {
    // iOS -> Background
    // Android -> Dominant
    ImageColors.getColors(pokemon.picture, { fallback: 'grey', cache: true, key: pokemon.picture })
      .then( colors => {
        if (!isMounted) return; // <--- Avoid changes to the state when the component isn't mounted

        colors.platform === 'ios';
        switch (colors.platform) {
          case 'android':
            setBgColor(colors.dominant || bgColor);
            break;
          case 'ios':
            setBgColor(colors.background || bgColor);
            break;
          default:
            setBgColor(bgColor);
            break;
        };
      });
    
    return () => {
      isMounted.current = false;    // <--- Destroy the component & avoid memory leaks
    }
  }, [])
  

  return (
    <TouchableOpacity
      activeOpacity={ 0.7 }
      onPress={
        () => navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor
        })
      }
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor
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
    // backgroundColor: 'grey',
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
    fontSize: 18,
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
    width: 100,
    height: 100,
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
