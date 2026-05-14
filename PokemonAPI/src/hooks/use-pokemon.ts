import { useEffect } from "react";
import { pegarPokemon, pegarDetalhesPokemon } from "@/services/pokemon-service";
import { usePokemonStore } from "@/store/pokemon.store";

export function usePokemon() {
  const {
    page,
    search,
    setPokemons,
    setLoading,
  } = usePokemonStore();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);

        // BUSCA POR NOME
        if (search.trim()) {
          const pokemon = await pegarDetalhesPokemon(search.toLowerCase());

          setPokemons([
            {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.front_default,
            },
          ]);

          return;
        }

        // PAGINAÇÃO
        const offset = (page - 1) * 20;

        const data = await pegarPokemon(offset, 20);

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const details = await pegarDetalhesPokemon(pokemon.name);

            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [page, search]);
}