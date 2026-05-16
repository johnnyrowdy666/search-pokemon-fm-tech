export const pokemonTypeNames = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water"
] as const;

export type PokemonTypeName = (typeof pokemonTypeNames)[number];

export type PokemonType = {
  icon: `/${string}.svg`;
  name: PokemonTypeName;
  slug: string;
};

const pokemonTypes = pokemonTypeNames.map((name) => {
  const slug = name.toLowerCase();

  return {
    icon: `/${slug}.svg`,
    name,
    slug
  } satisfies PokemonType;
});

export function getPokemonType(type: string): PokemonType {
  const normalizedType = type.toLowerCase();

  return (
    pokemonTypes.find((pokemonType) => pokemonType.slug === normalizedType) ?? {
      icon: "/normal.svg",
      name: "Normal",
      slug: "normal"
    }
  );
}
