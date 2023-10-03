import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import type { SimplePokemon, PokemonPaginatedResponse, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')  // <--- Reference to the next page of the api
  
  // Do the request to the pokeapi endpoint
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;   // <---- Pagination of pokemons with the ref
    mapPokemonListToSimplePokemon(resp.data.results);
  };

  // Transform the data shape
  const mapPokemonListToSimplePokemon = ( pokemonList: Result[] ) => {
    pokemonList.forEach( poke => console.log(poke.name) );
  };

  useEffect(() => {
    loadPokemons();
  }, [])

  return {
    simplePokemonList
  };
};
