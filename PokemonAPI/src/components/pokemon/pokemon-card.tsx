/*import { Card, CardHeader, CardTitle} from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
}
  
export function PokemonCard({ name, url }: PokemonCardProps) {
  
  return (
   <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="flex items-center justify-center p-4">
        {/* Temporariamente sem imagem para o Teste 1 */
      /*  <div className="w-32 h-32 bg-secondary rounded-md flex items-center justify-center text-muted-foreground text-xs mb-2">
          Sem Imagem (Por enquanto)
        </div>
        <CardTitle className="capitalize text-lg text-center font-semibold">
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}


// src/components/pokemon/pokemon-card.tsx */

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) { // porque ela esta exportando nome  e url?  porque precisa de interface se ela ta buscando na pokemon.API?, a interface serve para padronizar os dados qu e estão entrendo no componente?
  // Retira o ID numérico da URL da API. Exemplo: "https://pokeapi.co/api/v2/pokemon/1/" resulta em "1"
  const pokemonId = url.split("/").filter(Boolean).pop();
//explique como essa linha funciona, o que é o split, filter e pop?, de onde ele extrai o id?
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
//o retorno e o que vai ser renderizado na tela?
  return ( //o que significa essa estilização tailwind css
    <Card className="w-full transition-all duration-480 hover:shadow-lg hover:-translate-y-1 bg-white border border-slate-100">
      <CardHeader className="flex items-center justify-center p-4">
        <div className="w-36 h-36 flex items-center justify-center mb-2 relative">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy" //como funciona o lazy?
            className="w-full h-full object-contain drop-shadow-md transition-opacity duration-300"
            onError={(e) => { //o que significa essa linha?
              // explique o uso do fallback
              (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png";
            }}
          />
        </div>
        <CardTitle className="capitalize text-base text-slate-700 text-center font-bold tracking-wide mt-2">
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}