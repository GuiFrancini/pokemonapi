import { Card, CardHeader, CardTitle} from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  
  return (
   <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="flex items-center justify-center p-4">
        {/* Temporariamente sem imagem para o Teste 1 */}
        <div className="w-32 h-32 bg-secondary rounded-md flex items-center justify-center text-muted-foreground text-xs mb-2">
          Sem Imagem (Por enquanto)
        </div>
        <CardTitle className="capitalize text-lg text-center font-semibold">
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}