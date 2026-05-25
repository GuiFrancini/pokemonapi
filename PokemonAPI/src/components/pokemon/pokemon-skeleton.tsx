import { Skeleton } from "@/components/ui/skeleton";
import {Card, CardHeader} from "@/components/ui/card";

export function PokemonSkeleton() {
  return (

    <Card className="w-full">
      <CardHeader className="flex items-center justify-center p-4 space-y-4">
        <Skeleton className="w-32 h-32 rounded-md"/>
        <Skeleton className="h-5 w-24"/>
      </CardHeader>
      </Card>
  );
}

export function PokemonDetailsSkeleton() {
  return (<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Lado Esquerdo <-: Simulando a Imagem */}
        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center p-12 border-r">
          <Skeleton className="w-64 h-64 rounded-full" />
        </div>

        {/* Lado Direito ->: Simulando os Textos e Barras de Progresso */}
        <div className="w-full md:w-1/2 h-full p-8 bg-white flex flex-col gap-8">
          {/* Título e ID do poke */}
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Grid de Informações #) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          {/*  Barras de Base  de  stats */}
          <div className="space-y-4 mt-4">
            <Skeleton className="h-6 w-32 mb-4" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}