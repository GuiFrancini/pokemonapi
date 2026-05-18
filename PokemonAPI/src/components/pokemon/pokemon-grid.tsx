import { PokemonCard } from "./pokemon-card";
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
}