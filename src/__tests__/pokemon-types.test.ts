import {
  bulbasaurMock,
  charmanderMock,
  squirtleMock
} from "@/test/mocks/pokemon";

describe("starter Pokemon type mocks", () => {
  it("sets Bulbasaur as Grass", () => {
    expect(bulbasaurMock.types).toContain("Grass");
  });

  it("sets Charmander as Fire", () => {
    expect(charmanderMock.types).toContain("Fire");
  });

  it("sets Squirtle as Water", () => {
    expect(squirtleMock.types).toContain("Water");
  });
});
