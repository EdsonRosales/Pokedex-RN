import React, { useEffect, useRef } from 'react'
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonPaginated = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')  // <--- Reference to the next page of the api
  
  // Do the request to the pokeapi endpoint
  const loadPokemons = async () => {
    const resp = await pokemonApi.get(nextPageUrl.current);
    console.log(resp.data);
  };

  useEffect(() => {
    loadPokemons();
  }, [])
  
};
