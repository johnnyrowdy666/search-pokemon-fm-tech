import {
  getDefensiveCoverage,
  getOffensiveCoverage,
  filterByWeakness
} from "@/lib/type-chart";
import { bulbasaurMock, charmanderMock, squirtleMock } from "@/test/mocks/pokemon";

describe("getDefensiveCoverage", () => {
  it("returns all ×1 for a Normal type", () => {
    const coverage = getDefensiveCoverage(["Normal"]);
    expect(coverage.Fighting).toBe(2);
    expect(coverage.Ghost).toBe(0);
    expect(coverage.Normal).toBe(1);
  });

  it("handles dual-type Grass/Poison (Bulbasaur)", () => {
    const coverage = getDefensiveCoverage(["Grass", "Poison"]);
    // Fire: 2×(Grass) * 1×(Poison) = 2
    expect(coverage.Fire).toBe(2);
    // Ice: 2×(Grass) * 1×(Poison) = 2
    expect(coverage.Ice).toBe(2);
    // Flying: 2×(Grass) * 1×(Poison) = 2
    expect(coverage.Flying).toBe(2);
    // Psychic: 1×(Grass) * 2×(Poison) = 2
    expect(coverage.Psychic).toBe(2);
    // Water: 0.5×(Grass) * 1×(Poison) = 0.5
    expect(coverage.Water).toBe(0.5);
    // Electric: 0.5×(Grass) * 1×(Poison) = 0.5
    expect(coverage.Electric).toBe(0.5);
    // Grass: 0.5×(Grass) * 0.5×(Poison) = 0.25
    expect(coverage.Grass).toBe(0.25);
  });

  it("handles Ground/Flying for 4× Ice, 0× Ground", () => {
    const coverage = getDefensiveCoverage(["Ground", "Flying"]);
    expect(coverage.Ice).toBe(4);
    expect(coverage.Ground).toBe(0);
    expect(coverage.Fire).toBe(1);
    expect(coverage.Water).toBe(2);
  });
});

describe("getOffensiveCoverage", () => {
  it("returns strong-against list for Fire type", () => {
    const coverage = getOffensiveCoverage(["Fire"]);
    expect(coverage.Grass).toBe(2);
    expect(coverage.Ice).toBe(2);
    expect(coverage.Bug).toBe(2);
    expect(coverage.Steel).toBe(2);
    expect(coverage.Fire).toBe(0.5);
    expect(coverage.Water).toBe(0.5);
  });

  it("maxes across multiple attacker types", () => {
    const coverage = getOffensiveCoverage(["Fire", "Flying"]);
    // Grass is 2× from both Fire and Flying
    expect(coverage.Grass).toBe(2);
    // Steel is 2× from Fire, 0.5× from Flying -> max is 2
    expect(coverage.Steel).toBe(2);
  });
});

describe("filterByWeakness", () => {
  const pokemon = [bulbasaurMock, charmanderMock, squirtleMock];

  it("filters to Pokemon weak against Water", () => {
    const result = filterByWeakness(pokemon, "Water");
    // Charmander (Fire) is weak to Water, Bulbasaur (Grass/Poison) is resistant
    expect(result).not.toContainEqual(bulbasaurMock);
    expect(result).toContainEqual(charmanderMock);
    expect(result).not.toContainEqual(squirtleMock);
  });

  it("filters to Pokemon weak against Electric", () => {
    const result = filterByWeakness(pokemon, "Electric");
    // Squirtle (Water) is weak to Electric
    expect(result).toContainEqual(squirtleMock);
    // Bulbasaur is not weak to Electric
    expect(result).not.toContainEqual(bulbasaurMock);
  });

  it("returns empty array for unknown type", () => {
    const result = filterByWeakness(pokemon, "UnknownType123");
    expect(result).toEqual([]);
  });
});

describe("type-chart edge cases", () => {
  it("handles empty defender types", () => {
    const coverage = getDefensiveCoverage([]);
    expect(coverage.Normal).toBe(1);
    expect(coverage.Fire).toBe(1);
  });

  it("handles unknown types gracefully", () => {
    const coverage = getDefensiveCoverage(["UnknownType123"]);
    expect(coverage.Normal).toBe(1);
  });
});
