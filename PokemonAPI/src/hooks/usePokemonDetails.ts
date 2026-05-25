// src/hooks/usePokemonDetails.ts
import { useState, useEffect, useRef } from "react";
import { fetchPokemonDetails, fetchPokemonSpecies } from "../services/pokemon.api";

interface PokemonDetails {
  id: number;
  name: string;
  species: any; 
  sprites: any;
  height: number;
  weight: number;
  abilities: any[];
  stats: any[];
}

export const usePokemonDetails = (name: string | undefined) => {
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); 
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    if (!name) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Busca os detalhes primeiro
        const details = await fetchPokemonDetails(name);

        // extrai o nome correto da espécie que a própria API retornou
        // Ex: no Zygarde-50, o details.species.name será apenas "zygarde"
        const correctSpeciesName = details.species.name;

        // busca a espécie usando o nome  serto
        const species = await fetchPokemonSpecies(correctSpeciesName);

        if (!cancelled) {
          setData({ ...details, species });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Erro desconhecido"));
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
      abortControllerRef.current?.abort();
    };
  }, [name]);

  return { data, loading, error };
};