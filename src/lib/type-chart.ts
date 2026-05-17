const TYPE_NAMES = [
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

export type StandardTypeName = (typeof TYPE_NAMES)[number];

const TYPE_CHART: Record<StandardTypeName, Partial<Record<StandardTypeName, number>>> = {
  Bug: {
    Dark: 2,
    Fairy: 0.5,
    Fighting: 0.5,
    Fire: 0.5,
    Flying: 0.5,
    Ghost: 0.5,
    Grass: 2,
    Poison: 0.5,
    Psychic: 2,
    Steel: 0.5
  },
  Dark: {
    Dark: 0.5,
    Fairy: 0.5,
    Fighting: 0.5,
    Ghost: 2,
    Psychic: 2
  },
  Dragon: {
    Dragon: 2,
    Fairy: 0,
    Steel: 0.5
  },
  Electric: {
    Dragon: 0.5,
    Electric: 0.5,
    Flying: 2,
    Grass: 0.5,
    Ground: 0,
    Water: 2
  },
  Fairy: {
    Dark: 2,
    Dragon: 2,
    Fighting: 2,
    Fire: 0.5,
    Poison: 0.5,
    Steel: 0.5
  },
  Fighting: {
    Bug: 0.5,
    Dark: 2,
    Fairy: 0.5,
    Flying: 0.5,
    Ghost: 0,
    Ice: 2,
    Normal: 2,
    Poison: 0.5,
    Psychic: 0.5,
    Rock: 2,
    Steel: 2
  },
  Fire: {
    Bug: 2,
    Dragon: 0.5,
    Fire: 0.5,
    Grass: 2,
    Ice: 2,
    Rock: 0.5,
    Steel: 2,
    Water: 0.5
  },
  Flying: {
    Bug: 2,
    Electric: 0.5,
    Fighting: 2,
    Grass: 2,
    Rock: 0.5,
    Steel: 0.5
  },
  Ghost: {
    Ghost: 2,
    Normal: 0,
    Fighting: 0,
    Psychic: 2
  },
  Grass: {
    Bug: 0.5,
    Dragon: 0.5,
    Fire: 0.5,
    Flying: 0.5,
    Grass: 0.5,
    Ground: 2,
    Poison: 0.5,
    Rock: 2,
    Steel: 0.5,
    Water: 2
  },
  Ground: {
    Bug: 0.5,
    Electric: 2,
    Fairy: 1,
    Fire: 2,
    Flying: 0,
    Grass: 0.5,
    Poison: 2,
    Rock: 2,
    Steel: 2
  },
  Ice: {
    Dragon: 2,
    Fire: 0.5,
    Flying: 2,
    Grass: 2,
    Ground: 2,
    Ice: 0.5,
    Steel: 0.5,
    Water: 0.5
  },
  Normal: {
    Ghost: 0,
    Rock: 0.5,
    Steel: 0.5
  },
  Poison: {
    Fairy: 2,
    Ghost: 0.5,
    Grass: 2,
    Ground: 0.5,
    Poison: 0.5,
    Rock: 0.5,
    Steel: 0
  },
  Psychic: {
    Dark: 0,
    Fighting: 2,
    Poison: 2,
    Psychic: 0.5,
    Steel: 0.5
  },
  Rock: {
    Bug: 2,
    Fighting: 0.5,
    Fire: 2,
    Flying: 2,
    Ground: 0.5,
    Ice: 2,
    Steel: 0.5
  },
  Steel: {
    Electric: 0.5,
    Fairy: 2,
    Fire: 0.5,
    Ice: 2,
    Rock: 2,
    Steel: 0.5,
    Water: 0.5
  },
  Water: {
    Dragon: 0.5,
    Fire: 2,
    Grass: 0.5,
    Ground: 2,
    Rock: 2,
    Water: 0.5
  }
};

function normalizeType(type: string): StandardTypeName | undefined {
  const normalized = type.trim();
  const match = TYPE_NAMES.find((t) => t.toLowerCase() === normalized.toLowerCase());
  return match;
}

export function getDefensiveCoverage(
  defenderTypes: string[]
): Record<StandardTypeName, number> {
  const coverage = {} as Record<StandardTypeName, number>;

  for (const name of TYPE_NAMES) {
    coverage[name] = 1;
  }

  for (const attacker of TYPE_NAMES) {
    for (const def of defenderTypes) {
      const defNorm = normalizeType(def);
      if (!defNorm) {
        continue;
      }
      const chart = TYPE_CHART[attacker];
      const multiplier = chart[defNorm] ?? 1;
      coverage[attacker] *= multiplier;
    }
  }

  return coverage;
}

export function getOffensiveCoverage(
  attackerTypes: string[]
): Record<StandardTypeName, number> {
  const coverage: Record<StandardTypeName, number> = {} as Record<StandardTypeName, number>;

  for (const defender of TYPE_NAMES) {
    let maxMultiplier = 0;
    for (const attackerRaw of attackerTypes) {
      const attacker = normalizeType(attackerRaw);
      if (!attacker) {
        continue;
      }
      const chart = TYPE_CHART[attacker];
      const multiplier = chart[defender] ?? 1;
      maxMultiplier = Math.max(maxMultiplier, multiplier);
    }
    coverage[defender] = maxMultiplier;
  }

  return coverage;
}

export function filterByWeakness<T extends { types: string[] }>(
  pokemon: T[],
  type: string
): T[] {
  const targetType = normalizeType(type);
  if (!targetType) return [];

  return pokemon.filter((p) => {
    const coverage = getDefensiveCoverage(p.types);
    return coverage[targetType] > 1;
  });
}
