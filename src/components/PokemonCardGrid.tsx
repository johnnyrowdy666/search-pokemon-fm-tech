"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PokemonPreview } from "@/lib/pokemon";
import { TypeBadge } from "@/components/TypeBadge";

const PAGE_SIZE = 10;

type PokemonCardGridProps = {
  isLoading: boolean;
  pokemon: PokemonPreview[];
};

export function PokemonCardGrid({ isLoading, pokemon }: PokemonCardGridProps) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(pokemon.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visiblePokemon = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return pokemon.slice(start, start + PAGE_SIZE);
  }, [pokemon, safePage]);

  if (isLoading && pokemon.length === 0) {
    return (
      <section className="panel browse-panel" aria-live="polite">
        <div className="browse-heading">
          <h2>Browse Pokemon</h2>
          <p>Loading the Pokedex...</p>
        </div>
      </section>
    );
  }

  if (pokemon.length === 0) {
    return null;
  }

  return (
    <section className="panel browse-panel" aria-labelledby="browse-title">
      <div className="browse-heading">
        <div>
          <p className="eyebrow">Browse</p>
          <h2 id="browse-title">Pokemon cards</h2>
        </div>
        <p>
          Showing {visiblePokemon.length} of {pokemon.length}. Select a card to
          open its details.
        </p>
      </div>

      <div className="pokemon-grid">
        {visiblePokemon.map((item) => (
          <Link
            className="browse-card"
            href={`/?q=${encodeURIComponent(item.name)}`}
            key={item.id}
          >
         
            <img alt={item.name} src={item.image} />
            <span className="browse-card-copy">
              <small>#{item.number}</small>
              <strong>{item.name}</strong>
              <span>{item.classification}</span>
            </span>
            <span className="browse-card-types">
              {item.types.map((type) => (
                <TypeBadge type={type} size="md" />
              ))}
            </span>
          </Link>
        ))}
      </div>

      <div className="pagination" aria-label="Pokemon card pages">
        <button
          disabled={safePage === 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          type="button"
        >
          Previous
        </button>
        <span>
          Page {safePage} of {pageCount}
        </span>
        <button
          disabled={safePage === pageCount}
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  );
}
