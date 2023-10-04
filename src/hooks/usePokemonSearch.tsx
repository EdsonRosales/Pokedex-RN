import { useEffect, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import type { SimplePokemon, PokemonPaginatedResponse, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  
  // Do the request to the pokeapi endpoint
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1300');
    mapPokemonListToSimplePokemon(resp.data.results);
  };

  // Transform the data shape
  const mapPokemonListToSimplePokemon = ( pokemonList: Result[] ) => {
    
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');  // <--- Cut the original url by every '/' to create a new array with all parts
      const id = urlParts[ urlParts.length - 2 ];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

      return { id, picture, name };
    });

    // Set the state with the old & the new pokemons with the correct shape of data 'newPokemonList'
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, [])

  return {
    isFetching,
    simplePokemonList
  };
};
