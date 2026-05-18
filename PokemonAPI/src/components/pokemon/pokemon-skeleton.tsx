import { Skeleton } from "@/components/ui/skeleton";

export function PokemonSkeleton() {
  return (
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
}