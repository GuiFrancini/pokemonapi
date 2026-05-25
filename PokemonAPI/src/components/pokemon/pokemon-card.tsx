
import {useNavigate} from "react-router-dom";
import { Card,  CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) { 
  
  const navigate = useNavigate();
 
  const pokemonId = url.split("/").filter(Boolean).pop();

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return ( 
   <Card
   onClick={() => navigate(`/pokemon/${name}`)} 
   className="cursor-pointer w-full transition-all duration-500 hover: -translate-y-1 bg-white border border-slate-100 group"
   >
    <div className="w-full aspect-square max-w-[160px] flex items-center justify-center mb-6 relative">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Se falhar (comum em Megas/Formas Alternativas), busca o sprite clássico
            (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
          }}
        />
      </div>
        <CardTitle className="capitalize text-base text-slate-700 text-center font-bold tracking-wide">
          {name.replace("-", " ")}
        </CardTitle>
    </Card>
  );
}