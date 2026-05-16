import type { Pokemon } from "@/lib/pokemon";

function createPokemonMock(overrides: Partial<Pokemon>): Pokemon {
  return {
    id: "UG9rZW1vbjowMDE=",
    number: "001",
    name: "Bulbasaur",
    weight: {
      minimum: "6.04kg",
      maximum: "7.76kg"
    },
    height: {
      minimum: "0.61m",
      maximum: "0.79m"
    },
    classification: "Seed Pokemon",
    types: ["Grass", "Poison"],
    resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
    attacks: {
      fast: [{ name: "Tackle", type: "Normal", damage: 12 }],
      special: [{ name: "Power Whip", type: "Grass", damage: 70 }]
    },
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
    fleeRate: 0.1,
    maxCP: 951,
    evolutions: null,
    evolutionRequirements: {
      amount: 25,
      name: "Bulbasaur candies"
    },
    maxHP: 1071,
    image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    ...overrides
  };
}

export const bulbasaurMock = createPokemonMock({});

export const charmanderMock = createPokemonMock({
  id: "UG9rZW1vbjowMDQ=",
  number: "004",
  name: "Charmander",
  classification: "Lizard Pokemon",
  types: ["Fire"],
  resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
  weaknesses: ["Water", "Ground", "Rock"],
  image: "https://img.pokemondb.net/artwork/charmander.jpg"
});

export const squirtleMock = createPokemonMock({
  id: "UG9rZW1vbjowMDc=",
  number: "007",
  name: "Squirtle",
  classification: "Tiny Turtle Pokemon",
  types: ["Water"],
  resistant: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  image: "https://img.pokemondb.net/artwork/squirtle.jpg"
});
