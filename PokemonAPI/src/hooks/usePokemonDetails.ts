import { useState, useEffect, useRef } from "react";
import { fetchPokemonDetails, fetchPokemonSpecies } from "../services/pokemon.api";

// Defina interfaces adequadas
interface PokemonDetails {
  // adicione os campos que você usa
  id: number;
  name: string;
  species: any; // idealmente tipar também
  // ... outros campos
}

export const usePokemonDetails = (name: string | undefined) => {
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // guarde o erro
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    if (!name) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Cancela requisição anterior se existir
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    let cancelled = false; // flag para evitar atualizações pós-desmontagem

    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [details, species] = await Promise.all([
          fetchPokemonDetails(name),
          fetchPokemonSpecies(name)
        ]);

        // Só atualiza se ainda for relevante
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

    // Cleanup: marca como cancelado quando desmontar
    return () => {
      cancelled = true;
      abortControllerRef.current?.abort();
    };
  }, [name]);

  return { data, loading, error };
};