import type { PokemonPreview } from "@/lib/pokemon";

export function findClosestPokemon(
  searchTerm: string,
  pokemon: PokemonPreview[]
) {
  const normalizedSearch = normalize(searchTerm);

  if (!normalizedSearch) {
    return null;
  }

  return pokemon
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(normalizedSearch, normalize(candidate.name))
    }))
    .sort((left, right) => left.score - right.score)[0]?.candidate ?? null;
}

function scoreCandidate(search: string, candidate: string) {
  if (candidate.startsWith(search)) {
    return candidate.length - search.length;
  }

  if (candidate.includes(search)) {
    return candidate.length - search.length + 2;
  }

  return levenshteinDistance(search, candidate);
}

function levenshteinDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const insertion = current[rightIndex - 1] + 1;
      const deletion = previous[rightIndex] + 1;
      const substitution =
        previous[rightIndex - 1] +
        (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);

      current[rightIndex] = Math.min(insertion, deletion, substitution);
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
