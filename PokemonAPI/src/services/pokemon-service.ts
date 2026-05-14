const BASE_URL = 'https://pokeapi.co/api/v2';

export async function pegarPokemon(offset = 0, limit = 20) {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pokemons');
  }

  return response.json();
}

export async function pegarDetalhesPokemon(name: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);

  if (!response.ok) {
    throw new Error('Não encontramos seu pokemon');
  }

  return response.json();
}
