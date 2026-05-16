"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { POKEMON_DETAIL_QUERY, POKEMON_INDEX_QUERY } from "@/lib/graphql";
import { findClosestPokemon } from "@/lib/fuzzy-pokemon";
import {
  PokemonIndexQueryData,
  PokemonIndexQueryVariables,
  PokemonQueryData,
  PokemonQueryVariables
} from "@/lib/pokemon";
import { readRecentSearches, saveRecentSearch } from "@/lib/recent-searches";
import { PokemonResult } from "@/components/PokemonResult";
import { PokemonCardGrid } from "@/components/PokemonCardGrid";
import { RecentSearches } from "@/components/RecentSearches";
import { SearchInput } from "@/components/SearchInput";

export function PokemonSearchApp() {
  const searchParams = useSearchParams();
  const queryValue = searchParams.get("q")?.trim() ?? "";
  const deferredQueryValue = useDeferredValue(queryValue);
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    readRecentSearches()
  );

  const variables = useMemo<PokemonQueryVariables>(
    () => ({ name: deferredQueryValue }),
    [deferredQueryValue]
  );

  const handleCompleted = useCallback((completedData: PokemonQueryData) => {
    if (completedData.pokemon?.name) {
      setRecentSearches(saveRecentSearch(completedData.pokemon.name));
    }
  }, []);

  const { data, error, loading } = useQuery<
    PokemonQueryData,
    PokemonQueryVariables
  >(POKEMON_DETAIL_QUERY, {
    variables,
    skip: deferredQueryValue.length === 0,
    onCompleted: handleCompleted
  });

  const { data: indexData, loading: indexLoading } = useQuery<
    PokemonIndexQueryData,
    PokemonIndexQueryVariables
  >(POKEMON_INDEX_QUERY, {
    variables: { first: 151 }
  });

  const closestPokemon = useMemo(
    () =>
      data?.pokemon
        ? null
        : findClosestPokemon(deferredQueryValue, indexData?.pokemons ?? []),
    [data?.pokemon, deferredQueryValue, indexData?.pokemons]
  );

  return (
    <div className="search-layout">
      <section className="panel search-panel" aria-label="Pokemon search">
        <SearchInput
          isSearching={loading || deferredQueryValue !== queryValue}
          value={queryValue}
        />
        <RecentSearches searches={recentSearches} />
      </section>

      <PokemonResult
        error={error}
        isEmpty={queryValue.length === 0}
        loading={loading || indexLoading || deferredQueryValue !== queryValue}
        closestPokemon={closestPokemon}
        pokemon={data?.pokemon ?? null}
        searchTerm={deferredQueryValue}
      />

      <PokemonCardGrid
        isLoading={indexLoading}
        pokemon={indexData?.pokemons ?? []}
      />
    </div>
  );
}
