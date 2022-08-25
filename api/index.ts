import axios from 'axios';
import { IPokemons } from '../components/Pokemon';

export async function getPokemons(offset: number = 0, limit: number) {
  const { data } = await axios.get<IPokemons>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  return data;
}
