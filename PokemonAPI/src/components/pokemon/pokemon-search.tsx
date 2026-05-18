// src/components/pokemon/pokemon-search.tsx
import { useEffect, useState } from "react";
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
      
      {/* Filtro de Ordem Alfabética do wireframe */}
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
}