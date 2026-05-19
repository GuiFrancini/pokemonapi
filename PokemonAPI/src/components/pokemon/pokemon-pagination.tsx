// src/components/pokemon/pokemon-pagination.tsx
import { usePokemonStore } from "@/store/pokemon.store";
import { usePokemon } from "@/hooks/use-pokemon";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
// Caso dê erro de import no select do shadcn, use a linha padrão:
// import { Select as ShadSelect } from "@/components/ui/select";

export function PokemonPagination() {
  const { page, limit, setPage, setLimit } = usePokemonStore();
  const { totalPages } = usePokemon();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4 mt-4 px-4">
      {/* Seletor de limite por página conforme wireframe */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Exibir:</span>
        <Select value={String(limit)} onValueChange={(val) => setLimit(Number(val))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={String(limit)} />
          </  SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Controles de navegação principal */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => setPage(Math.max(page - 1, 1))} 
          disabled={page === 1}
        >
          Anterior  
        </Button>
        
        <span className="text-sm font-medium">
          página {page} de {totalPages}
        </span>

        <Button 
          variant="outline" 
          onClick={() => setPage(Math.min(page + 1, totalPages))} 
          disabled={page === totalPages}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}