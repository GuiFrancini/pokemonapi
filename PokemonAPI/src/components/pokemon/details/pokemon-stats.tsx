import { Progress } from "@/components/ui/progress";

export function PokemonStats({ stats }: { stats: any[] }) {
  const statLabels: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Base Stats</h3>
      {stats.map((s) => (
        <div key={s.stat.name} className="space-y-1">
          <div className="flex justify-between text-sm font-medium uppercase text-slate-500">
            <span>{statLabels[s.stat.name]}</span>
            <span>{s.base_stat}</span>
          </div>
          <Progress 
            value={(s.base_stat / 255) * 100} 
            className="h-2 bg-slate-100" 
            //um tipo de cor para cada status
          />
        </div>
      ))}
    </div>
  );
}