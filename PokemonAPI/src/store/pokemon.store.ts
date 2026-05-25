import  {create} from "zustand";

interface PokemonState { 
    search: string;
    page: number;
    limit: number;
    sortOrder: "asc" | "desc"; 
    isSearching: boolean;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSortOrder: (order: "asc" | "desc") => void;
    setIsSearching: (state: boolean) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
    search: "",
    page: 1,
    limit:10,
    sortOrder: "asc",
    isSearching: false,
    setSearch: (search) => set({ search,  page: 1, isSearching: false}),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set ({ limit, page: 1}),
    setSortOrder: (sortOrder) => set({ sortOrder}),  
    setIsSearching: (isSearching) => set({ isSearching }),
}));