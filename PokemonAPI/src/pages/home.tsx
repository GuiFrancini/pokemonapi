import { useEffect, useMemo, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PAGE_SIZE = 20;

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchPokemons() {
      setLoading(true);
      setError(null);

      try {
        if (search.trim()) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);

          if (!response.ok) {
            throw new Error("Pokémon não encontrado");
          }

          const pokemon = await response.json();

          if (!active) return;

          setPokemons([
            {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.front_default,
            },
          ]);
          return;
        }

        const offset = (page - 1) * PAGE_SIZE;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de Pokémon");
        }

        const data = await response.json();

        const details = await Promise.all(
          data.results.map(async (item: any) => {
            const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`);
            const detail = await detailResponse.json();

            return {
              id: detail.id,
              name: detail.name,
              image: detail.sprites.front_default,
            };
          })
        );

        if (!active) return;
        setPokemons(details);
      } catch (err: any) {
        if (!active) return;
        setError(err.message || "Erro ao carregar os pokémons");
        setPokemons([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPokemons();

    return () => {
      active = false;
    };
  }, [page, search]);

  const canPrev = page > 1;
  const canNext = pokemons.length === PAGE_SIZE && !search.trim();

  const title = useMemo(() => (search.trim() ? `Resultados para "${search}"` : "Pokédex"), [search]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <div className="mb-6">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar Pokémon..."
          className="w-full max-w-lg rounded-md border border-slate-300 px-4 py-2"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-slate-200 p-4">
              <div className="h-24 w-full animate-pulse rounded-full bg-slate-200" />
              <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="rounded-xl border border-slate-200 p-4 text-center">
              <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-3 h-24 w-24 object-contain" />
              <strong className="capitalize">{pokemon.name}</strong>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!canPrev}
          className="rounded-md border border-slate-300 px-4 py-2 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="font-bold">Página {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!canNext}
          className="rounded-md border border-slate-300 px-4 py-2 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </main>
  );
}
