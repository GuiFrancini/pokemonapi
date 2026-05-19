export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}

// Buscaremos uns 2000 Pokémon principais (Gerações 1 a 9) de uma vez para o filtro local
export const fetchAllPokemon = async (): Promise<NamedAPIResource[]> => {

  try{
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados da PokéAPI");
  }
  const data: PokemonListResponse = await response.json();
  return data.results;
}

catch (error) {
    console.error("Ocorreu um erro PokeAPI:", error);
    // Trata o erro aqui ou repassa um erro amigável
    throw new Error("Não foi Possivel buscar dados na PokeAPI, verifique sua internet.", { cause: error});
  }
};