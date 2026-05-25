 // src/components/pokemon/pokemon-grid.tsx
import { usePokemon } from "@/hooks/use-pokemon";
import { usePokemonStore } from "@/store/pokemon.store";
import { PokemonCard } from "./pokemon-card";
import { PokemonSkeleton } from "./pokemon-skeleton";

export function PokemonGrid() {
  const { pokemonList, loading, error } = usePokemon();
  const { limit, isSearching } = usePokemonStore();

  // Exibe Skeletons correspondentes ao número de itens por página enquanto carrega ou busca
  if (loading || isSearching) {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 px-4 sm:px-8 py-6">
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5 px-4 sm:px-12 py-6 min-h-[450px]">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
}
