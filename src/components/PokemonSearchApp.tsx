"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDeferredValue, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { POKEMON_DETAIL_QUERY, POKEMON_INDEX_QUERY } from "@/lib/graphql";
import { findClosestPokemon } from "@/lib/fuzzy-pokemon";
import {
  PokemonIndexQueryData,
  PokemonIndexQueryVariables,
  PokemonQueryData,
  PokemonQueryVariables
} from "@/lib/pokemon";
import { PokemonResult } from "@/components/PokemonResult";
import { PokemonCardGrid } from "@/components/PokemonCardGrid";
import { TypeSelector } from "@/components/TypeSelector";
import { SearchInput } from "@/components/SearchInput";

const TYPE_QUERY_PREFIX = /^type:(.+)/i;

function parseTypeFilter(value: string): string | null {
  const match = value.match(TYPE_QUERY_PREFIX);
  return match ? match[1].trim() : null;
}

export function PokemonSearchApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryValue = searchParams.get("q")?.trim() ?? "";
  const deferredQueryValue = useDeferredValue(queryValue);
  const typeFilter = useMemo(() => parseTypeFilter(deferredQueryValue), [deferredQueryValue]);
  const isTypeQuery = typeFilter !== null;
  const detailQueryTerm = isTypeQuery ? "" : deferredQueryValue;

  const variables = useMemo<PokemonQueryVariables>(
    () => ({ name: detailQueryTerm }),
    [detailQueryTerm]
  );

  const { data, error, loading } = useQuery<
    PokemonQueryData,
    PokemonQueryVariables
  >(POKEMON_DETAIL_QUERY, {
    variables,
    skip: detailQueryTerm.length === 0,
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
        : findClosestPokemon(detailQueryTerm, indexData?.pokemons ?? []),
    [data?.pokemon, detailQueryTerm, indexData?.pokemons]
  );

  const filteredPokemon = useMemo(() => {
    const all = indexData?.pokemons ?? [];
    if (!isTypeQuery || !typeFilter) return all;
    return all.filter((p) =>
      p.types.some((t) => t.toLowerCase() === typeFilter.toLowerCase())
    );
  }, [indexData, isTypeQuery, typeFilter]);

  const handleTypeSelect = (type: string | null) => {
    const nextPath = type
      ? `/?q=${encodeURIComponent(`type:${type}`)}`
      : "/";
    router.replace(nextPath, { scroll: false });
  };

  return (
    <div className="search-layout">
      <section className="panel search-panel" aria-label="Pokemon search">
        <SearchInput
          isSearching={loading || deferredQueryValue !== queryValue}
          value={queryValue}
        />
        <TypeSelector activeType={typeFilter} onSelect={handleTypeSelect} />
      </section>

      <PokemonResult
        error={error}
        isEmpty={queryValue.length === 0}
        loading={loading || indexLoading || deferredQueryValue !== queryValue}
        closestPokemon={closestPokemon}
        pokemon={data?.pokemon ?? null}
        searchTerm={deferredQueryValue}
        typeFilter={typeFilter}
      />

      <PokemonCardGrid
        isLoading={indexLoading}
        pokemon={isTypeQuery ? filteredPokemon : indexData?.pokemons ?? []}
      />
    </div>
  );
}
