// src/components/pokemon/pokemon-search.tsx
/* import { useEffect, useState } from "react";
import { usePokemonStore } from "@/store/pokemon.store";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PokemonSearch() {
  const { setSearch, sortOrder, setSortOrder } = usePokemonStore();
  const [localSearch, setLocalSearch] = useState("");

  // Efeito de Debounce: Atualiza o estado global 300ms após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, setSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-t-lg border-b">
      <div className="flex-1">
        <Input
          placeholder="Buscar por nome"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full bg-white"
        />
      </div>
      
      {/* Filtro de Ordem Alfabética do wireframe /}
      <div className="w-full sm:w-[180px]">
        <Select value={sortOrder} onValueChange={(val: "asc" | "desc") => setSortOrder(val)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Ordenação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ordem A-Z</SelectItem>
            <SelectItem value="desc">Ordem Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}*/

// src/components/pokemon/pokemon-search.tsx
import { useEffect, useState } from "react";
import { usePokemonStore } from "@/store/pokemon.store";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PokemonSearch() {
  const { setSearch, sortOrder, setSortOrder, limit, setLimit } = usePokemonStore();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, setSearch]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-2">
      {/* Linha de Controles Unificada */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        
        {/* Input de Busca */}
        <div className="w-full sm:w-[320px]">
          <Input
            placeholder="Buscar por nome..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-10 bg-white border-slate-200 rounded-full shadow-sm focus-visible:ring-rose-500"
          />
        </div>
        
        {/* Filtro de Ordenação */}
        <div className="w-full sm:w-[160px]">
          <Select value={sortOrder} onValueChange={(val: "asc" | "desc") => setSortOrder(val)}>
            <SelectTrigger className="w-full h-10 bg-white border-slate-200 rounded-full shadow-sm focus:ring-rose-500">
              <SelectValue placeholder="Ordenação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ordem: A-Z</SelectItem>
              <SelectItem value="desc">Ordem: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantidade por Página (Trazido do rodapé para o topo conforme o layout) */}
        <div className="w-full sm:w-[150px]">
          <Select value={String(limit)} onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="w-full h-10 bg-white border-slate-200 rounded-full shadow-sm focus:ring-rose-500">
              <span className="text-sm text-muted-foreground mr-1">Exibir:</span>
              <SelectValue placeholder={String(limit)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}