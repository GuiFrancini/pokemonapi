// src/pages/home.tsx
import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import { PokemonSearch } from "@/components/pokemon/pokemon-search";
import { PokemonPagination } from "@/components/pokemon/pokemon-pagination";
import PokeLogo from "@/assets/PokeLogo.png";

export function Home() {
  return (
   <div className="min-h-screen bg-white flex flex-col w-full">
<header className="w-full bg-[#ef5350] h-10 flex items-center justify-center relative shadow-md">
 <img 
 src={PokeLogo} 
 alt="Pokémon Logo" 
 className="h-9 w-auto object-contain drop-shadow-sm select-none" />
</header>
       <main className="flex-1 w-full bg-white pt-4">
        <PokemonSearch />
        <PokemonGrid />
</main>

        <footer className="w-full bg-white">
        <PokemonPagination />
        </footer>
      </div>
   
  );
}