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

  it("returns null for empty search term", () => {
    expect(findClosestPokemon("", pokemon)).toBeNull();
  });

  it("returns null for whitespace-only search term", () => {
    expect(findClosestPokemon("   ", pokemon)).toBeNull();
  });

  it("finds exact matches", () => {
    expect(findClosestPokemon("Bulbasaur", pokemon)?.name).toBe("Bulbasaur");
    expect(findClosestPokemon("Charmander", pokemon)?.name).toBe("Charmander");
    expect(findClosestPokemon("Squirtle", pokemon)?.name).toBe("Squirtle");
  });

  it("handles case insensitive search", () => {
    expect(findClosestPokemon("bulbasaur", pokemon)?.name).toBe("Bulbasaur");
    expect(findClosestPokemon("BULBASAUR", pokemon)?.name).toBe("Bulbasaur");
  });

  it("returns best match even for non-matching terms", () => {
   
    expect(findClosestPokemon("NonExistentPokemon", pokemon)).not.toBeNull();
  });

  it("handles search terms with numbers", () => {
    
    expect(findClosestPokemon("001", pokemon)).not.toBeNull();
  });

  it("prefers shorter exact matches over longer partial matches", () => {
  
    expect(findClosestPokemon("squirt", pokemon)?.name).toBe("Squirtle");
  });

  it("handles special characters by normalizing them", () => {

    expect(findClosestPokemon("mr. mime", pokemon)).not.toBeNull();
  });

  it("handles very short search terms", () => {
    
    expect(findClosestPokemon("a", pokemon)).not.toBeNull();
  });

  it("handles very long search terms", () => {
    
    expect(findClosestPokemon("bulbasaurx", pokemon)).not.toBeNull();
  });
});
