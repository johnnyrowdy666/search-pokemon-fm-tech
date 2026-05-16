export type PokemonDimension = {
  minimum: string;
  maximum: string;
};

export type PokemonAttack = {
  name: string;
  type: string;
  damage: number;
};

export type PokemonAttacks = {
  fast: PokemonAttack[];
  special: PokemonAttack[];
};

export type PokemonEvolutionRequirement = {
  amount: number;
  name: string;
};

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttacks;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Pokemon[] | null;
  evolutionRequirements: PokemonEvolutionRequirement | null;
  maxHP: number;
  image: string;
};

export type PokemonQueryData = {
  pokemon: Pokemon | null;
};

export type PokemonQueryVariables = {
  name: string;
};

export type PokemonPreview = {
  id: string;
  number: string;
  name: string;
  classification: string;
  types: string[];
  image: string;
};

export type PokemonIndexQueryData = {
  pokemons: PokemonPreview[];
};

export type PokemonIndexQueryVariables = {
  first: number;
};
