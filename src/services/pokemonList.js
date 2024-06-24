import axios from "axios";
import { POKEMON_BASE_URL } from "../utils/constand";

export const IPokemonList = {
  getPokemonList: async (limit, offset) => {
    try {
      const response = await axios.get(
        `${POKEMON_BASE_URL}pokemon?limit=${limit || 151}&offset=${offset || 0}`
      );
      return response;
    } catch (error) {
      console.log("error: " + error);
      new Error(error);
    }
  },
  getPokemonDetail: async (name) => {
    try {
      const response = await axios.get(`${POKEMON_BASE_URL}pokemon/${name}`);
      return response;
    } catch (error) {
      console.log("error: " + error);
      new Error(error);
    }
  },
};
