import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { PokemonStats } from "@/components/pokemon/details/pokemon-stats";
import { PokemonDetailsSkeleton } from "@/components/pokemon/pokemon-skeleton";

export function PokemonDetailsPage() {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const { data, loading, error } = usePokemonDetails(name);

  if (loading) return <PokemonDetailsSkeleton />;

  // se deu erro ou data veio nulo, exibe isso
  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-3xl text-center max-w-sm">
          <h2 className="text-2xl font-bold text-rose-500 mb-4">Ops!</h2>
          <p className="text-slate-600 mb-6">Não conseguimos carregar os dados deste Pokémon.</p>
          <Button onClick={() => navigate(-1)}>Voltar para a Pokédex</Button>
        </div>
      </div>
    );
  }


  // se a API não tiver a categoria em inglês, ele retorna undefined
  const category = data.species?.genera?.find((g: any) => g.language.name === "en")?.genus || "Desconhecido";
  
  // imagem oficial se disponível, senão fallback para sprite clássico (muito comum em formas alternativas e megas)
  const imageUrl = data.sprites?.other?.["official-artwork"]?.front_default || "";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 rounded-full bg-white/80 hover:bg-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center p-12 border-r">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={name}
              className="w-full h-auto drop-shadow-2xl"
            />
          )}
        </div>

        <ScrollArea className="w-full md:w-1/2 h-full p-8 bg-white">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-black capitalize text-slate-900">{name?.replace(/-/g, " ")}</h1>
              <p className="text-slate-400 font-medium">#{String(data.id).padStart(3, '0')}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InfoItem label="Height" value={`${data.height / 10}m`} />
              <InfoItem label="Category" value={category} />
              <InfoItem label="Weight" value={`${data.weight / 10}kg`} />
              {/*  mapeando as abilities */}
              <InfoItem label="Abilities" value={data.abilities?.map((a:any) => a.ability.name).join(", ") || "N/A"} />
            </div>

            {data.stats && <PokemonStats stats={data.stats} />}
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