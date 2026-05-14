import { create } from "zustand";

interface Pokemon{
    id: number;
    name: string;
    image: string;
}

interface PokemonStore {
    pokemons: Pokemon[]; // array de pokemons
    loading: boolean;
    search: string;
    page: number;

    setPokemons: (pokemon: Pokemon[]) => void;
    setLoading: (loading: boolean) => void;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
    pokemons: [],
    loading: false,
    search: "",
    page: 1,

    setPokemons: (pokemons) => set({ pokemons }),
    setLoading: (loading) => set({ loading }),
    setSearch: (search) => set({ search }),
    setPage: (page) => set({ page }),
}));

