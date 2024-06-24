import { create } from "zustand";

const initialState = {
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  fetchPokemon: {
    data: [],
    loading: false,
    error: null,
  },
};

export const usePokemonStore = create((set) => ({
  ...initialState,
  setPokemonList: (value) => set({ pokemon: value }),
  setFetchPokemon: (value) => set({ fetchPokemon: value }),
}));
