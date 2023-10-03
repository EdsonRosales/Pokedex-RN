import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import type { SimplePokemon, PokemonPaginatedResponse, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  
  const [isLoading, setIsLoading] = useState(true); // <---- Loader
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')  // <--- Reference to the next page of the api
  
  // Do the request to the pokeapi endpoint
  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;   // <---- Pagination of pokemons with the ref
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
    setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, [])

  return {
    isLoading,
    simplePokemonList,
    loadPokemons
  };
};
