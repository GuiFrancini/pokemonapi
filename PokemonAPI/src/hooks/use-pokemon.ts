/* import { useState, useEffect } from "react"; 
import { fetchAllPokemon,} from "../services/pokemon.api";
import type { NamedAPIResource } from "../services/pokemon.api";
import { usePokemonStore } from "../store/pokemon.store";

export const usePokemon =() => {
  const { search, page, limit, sortOrder } = usePokemonStore();
//qual a diferença entre { } e []?
  const [allPokemon, setAllPokemon] = useState<NamedAPIResource[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<NamedAPIResource[]>([]);
  const [paginatedPokemon, setPaginatedPokemon] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


 // api carregará todos os dados aqui
 useEffect(() => {
  const loadData = async () => {
    try {
      setLoading (true);
      const data = await fetchAllPokemon();
      setAllPokemon(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar os pokemons");
    } finally {
      setLoading(false);

    
    }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...allPokemon];

    if (search.trim() !== ""){
      result = result.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()));

    }

    result.sort((a, b) => {
      if(sortOrder === "asc") return a.name. localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    setFilteredPokemon(result);
  }, [allPokemon, search, sortOrder]);

  //paginação
  useEffect(() => {
    const startIndex = (page -1)* limit;
    const endIndex = startIndex + limit;
    setPaginatedPokemon(filteredPokemon.slice(startIndex, endIndex));
  }, [filteredPokemon, page, limit]);

  const totalPages = Math.ceil(filteredPokemon.length / limit) || 1;

  return{
    pokemonList: paginatedPokemon,
    loading,
    error,
    totalPages,
    };
  }; */

// src/hooks/usePokemon.ts
import { useState, useEffect, useMemo } from "react";
import type { NamedAPIResource } from "../services/pokemon.api";
import { fetchAllPokemon } from "../services/pokemon.api";
import { usePokemonStore } from "../store/pokemon.store";

export const usePokemon = () => {
  const { search, page, limit, sortOrder, } = usePokemonStore();//setIsSearching 

  // Mantemos apenas o estado do que vem de FORA (API)
  const [allPokemon, setAllPokemon] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // 1. Único useEffect necessário: buscar dados da API externa
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPokemon();
        setAllPokemon(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro ao buscar dados na API"); //setError(err.message :
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  

  // 2. FILTRO E ORDENAÇÃO: Calculado em tempo de execução com useMemo
  const filteredPokemon = useMemo(() => {
    let result = [...allPokemon];

    
    
    if (search.trim() !== "") {

      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

   // setIsSearching(false);

    return result;
  }, [allPokemon, search, sortOrder]); // Só recalcula se um desses 3 mudar

  

  // 3. PAGINAÇÃO: Também calculada dinamicamente com useMemo
  const paginatedPokemon = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, page, limit]); // Só recalcula se a lista filtrada ou a página mudar

  // Total de páginas calculado dinamicamente
  const totalPages = Math.ceil(filteredPokemon.length / limit) || 1;

  return {
    pokemonList: paginatedPokemon, // O grid vai continuar recebendo isso aqui normalmente
    loading,
    error,
    totalPages,
  };
};

