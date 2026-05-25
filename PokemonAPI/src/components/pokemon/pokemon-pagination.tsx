// src/components/pokemon/pokemon-pagination.tsx
import { usePokemonStore } from "@/store/pokemon.store";
import { usePokemon } from "@/hooks/use-pokemon";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PokemonPagination() {
  const { page, setPage, } = usePokemonStore();
  const { totalPages } = usePokemon();

  return (
    <div className="flex items-center justify-center gap-4 py-8 gap-4 py-8 w-full">
         
    <Button 
        variant="outline" 
        size="icon"
        onClick={() => setPage(Math.max(page - 1, 1))} 
        disabled={page === 1}
        className="rounded-full text-slate-500 hover:bg-slate-100"
      >
        <ChevronLeft className="h-5 w-5" />
        
      </Button>
      
      <span className="text-sm font-medium text-slate-600 select-none">
        página {page} de {totalPages}
      </span>

      <Button 
        variant="outline" 
        size="icon"
        onClick={() => setPage(Math.min(page + 1, totalPages))} 
        disabled={page === totalPages}
        className="rounded-full text-slate-500 hover:bg-slate-100"
      >
        <ChevronRight className="h-5 w-5" />
       
      </Button>
    </div>
  );
}
     
     

