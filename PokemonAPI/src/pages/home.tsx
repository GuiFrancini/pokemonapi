// src/pages/home.tsx
import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import { PokemonSearch } from "@/components/pokemon/pokemon-search";
import { PokemonPagination } from "@/components/pokemon/pokemon-pagination";

export function Home() {
  return (
    <div className="container mx-auto py-8 max-w-5xl px-4">
      <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
        <PokemonSearch />
        <PokemonGrid />
        <PokemonPagination />
      </div>
    </div>
  );
}