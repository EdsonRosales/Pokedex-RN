import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  Text,
  View 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchInput } from '../components/SearchInput';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';

import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { styles } from "../theme/appTheme";

import type { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();

  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]); // <---- This is the list that shows in the Flatlist(screen) when the user made the debounced term on the input
  const [term, setTerm] = useState(''); // <--- Search term (Keyword)

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredPokemons([]);
    }

    // Make the search filter by the given words
    setFilteredPokemons(
      simplePokemonList.filter(
        pokemon => pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      )
    )
  }, [term])
  

  if (isFetching) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20
      }}
    >
      <SearchInput
        onDebounce={ (value) => setTerm(value) }  // Do somehting when the user stops writing
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios') ? top : top + 20
        }}
      />

      <FlatList
        data={ filteredPokemons }
        keyExtractor={ (pokemon) => pokemon.id }
        showsVerticalScrollIndicator={false}
        numColumns={ 2 }
        // Header
        ListHeaderComponent={(
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 10,
              marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80
            }}
          >{term}</Text>
        )}
        renderItem={ ({ item }) => (
          <PokemonCard pokemon={ item } />
        )}
      />
    </View>
  )
};
