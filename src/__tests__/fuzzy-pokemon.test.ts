import { findClosestPokemon } from "@/lib/fuzzy-pokemon";
import {
  bulbasaurMock,
  charmanderMock,
  squirtleMock
} from "@/test/mocks/pokemon";

describe("findClosestPokemon", () => {
  const pokemon = [bulbasaurMock, charmanderMock, squirtleMock];

  it("finds the closest typo match", () => {
    expect(findClosestPokemon("bulbasar", pokemon)?.name).toBe("Bulbasaur");
  });

  it("prioritizes prefix matches for Ajax search", () => {
    expect(findClosestPokemon("squi", pokemon)?.name).toBe("Squirtle");
  });
});
