export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}


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

export const fetchPokemonDetails = async (name: string) => {
  try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do Pokémon");
  }
  return response.json();
} catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    throw new Error("Não foi possível buscar detalhes do Pokémon.", { cause: error });
}
};


export const fetchPokemonSpecies = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
   
    if (!response.ok) {
      throw new Error(`Erro ao buscar espécie do Pokémon ${name}`);
    } 
    return await response.json();
  }catch (error) {
    console.error("erro ao buscar especie", error);
    throw new Error("Não foi possível buscar a espécie do Pokémon.", { cause: error });

  }
    
  };