/*import { PokemonCard } from "./pokemon-card";
import { usePokemon } from "@/hooks/use-pokemon";



export function PokemonGrid() {
  const { pokemonList, loading, error } = usePokemon();

if (loading) return <div className="text-center py-10">Carregando dados da API...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Erro: {error}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
} */

  // src/components/pokemon/pokemon-grid.tsx
import { usePokemon } from "@/hooks/use-pokemon";
import { usePokemonStore } from "@/store/pokemon.store";
import { PokemonCard } from "./pokemon-card";
import { PokemonSkeleton } from "./pokemon-skeleton";

export function PokemonGrid() {
  const { pokemonList, loading, error } = usePokemon();
  const { limit, isSearching } = usePokemonStore();

  // Exibe Skeletons correspondentes ao limite por página configurado
  if (loading || isSearching) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-5 p-5">
        {Array.from({ length: limit }).map((_, index) => (
          <PokemonSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) 
    return
      <div className="text-center text-destructive font-medium py-12">
        Houve um erro ao carregar os Pokémon: {error}
      </div>;
  if (pokemonList.length === 0) 
    return 
      <div className="text-center text-muted-foreground py-12">
        Nenhum Pokémon encontrado para esta busca.
      </div>;
  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 min-h-[400px]">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
}
