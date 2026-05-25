// src/hooks/usePokemon.ts
import { useState, useEffect, useMemo } from "react";
import type { NamedAPIResource } from "../services/pokemon.api";
import { fetchAllPokemon } from "../services/pokemon.api";
import { usePokemonStore } from "../store/pokemon.store";

export const usePokemon = () => {
  const { search, page, limit, sortOrder, } = usePokemonStore();//setIsSearching 

  // estados locais para carregamento , poke e erro
  const [allPokemon, setAllPokemon] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // buscar dados da api apenas uma vez quando o componente monta
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
  

  // filtro e ordenação usando o usememo pois ele deriva do estado original
  //  e não precisa ser recalculado a cada renderização
  //  apenas quando os dados ou os critérios de busca/ordenação mudarem

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

  

  // paginação calculada dinamicamente com useMemo
  const paginatedPokemon = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, page, limit]); // Só recalcula se a lista filtrada ou a página mudar

  // Total de paginas 
  const totalPages = Math.ceil(filteredPokemon.length / limit) || 1;

  return {
    pokemonList: paginatedPokemon, // O grid recebe a lista já filtrada, ordenada e paginada
    loading,
    error,
    totalPages,
  };
};

