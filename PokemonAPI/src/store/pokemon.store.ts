import  {create} from "zustand";

interface PokemonState { //estado global do pokemon? 
    search: string;
    page: number;
    limit: number;
    sortOrder: "asc" | "desc"; //sortorder é um metodo? asc e desc são parametros ou nomes?
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSortOrder: (order: "asc" | "desc") => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
    search: "",
    page: 1,
    limit:10,
    sortOrder: "asc",
    setSearch: (search) => set({ search,  page: 1}),
    setPage: (page) => set({ page}),
    setLimit: (limit) => set ({ limit, page: 1}),
    setSortOrder: (sortOrder) => set({ sortOrder}),  
}));