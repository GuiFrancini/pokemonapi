// src/pages/pokemon-details-page.tsx
import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { PokemonStats } from "@/components/pokemon/details/pokemon-stats";
import { PokemonDetailsSkeleton } from "@/components/pokemon/pokemon-skeleton";

export function PokemonDetailsPage() {
  const { name } = useParams(); // Conceito de useParams (Regra 5)
  const navigate = useNavigate();
  const { data, loading } = usePokemonDetails(name);

  if (loading) return <PokemonDetailsSkeleton />;

  const category = data.species.genera.find((g: any) => g.language.name === "en")?.genus;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Botão Voltar */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 rounded-full bg-white/80 hover:bg-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        {/* Lado Esquerdo: Imagem */}
        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center p-12 border-r">
          <img 
            src={data.sprites.other["official-artwork"].front_default} 
            alt={name}
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Lado Direito: Info com ScrollArea */}
        <ScrollArea className="w-full md:w-1/2 h-full p-8 bg-white">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-black capitalize text-slate-900">{name}</h1>
              <p className="text-slate-400 font-medium">#{String(data.id).padStart(3, '0')}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InfoItem label="Height" value={`${data.height / 10}m`} />
              <InfoItem label="Category" value={category} />
              <InfoItem label="Weight" value={`${data.weight / 10}kg`} />
              <InfoItem label="Abilities" value={data.abilities.map((a:any) => a.ability.name).join(", ")} />
            </div>

            <PokemonStats stats={data.stats} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{label}</h4>
      <p className="text-lg font-semibold text-slate-700 capitalize">{value}</p>
    </div>
  );
}