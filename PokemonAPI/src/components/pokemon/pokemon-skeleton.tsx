import { Skeleton } from "@/components/ui/skeleton";
import {Card, CardHeader} from "@/components/ui/card";

export function PokemonSkeleton() {
  return (

    <Card className="w-full">
      <CardHeader className="flex items-center justify-center p-4 space-y-4">
        <Skeleton className="w-32 h-32 rounded-md"/>
        <Skeleton className="h-5w-24"/>
      </CardHeader>
      </Card>
  );
}

    /* </Card>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-xl p-4"
        >
          <Skeleton className="w-24 h-24 mx-auto rounded-full" />

          <Skeleton className="h-4 w-20 mx-auto mt-4" />
        </div>
      ))}
    </div>
  );
}*/