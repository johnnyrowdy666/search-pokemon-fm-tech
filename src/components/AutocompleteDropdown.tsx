"use client";

import { useEffect, useRef } from "react";
import { TypeBadge } from "@/components/TypeBadge";
import type { PokemonPreview } from "@/lib/pokemon";

type AutocompleteDropdownProps = {
  query: string;
  allPokemon: PokemonPreview[];
  onSelect: (pokemonName: string) => void;
};

export function AutocompleteDropdown({
  query,
  allPokemon,
  onSelect
}: AutocompleteDropdownProps) {
  // Filter Pokemon based on the query
  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(query.toLowerCase()) && query.length > 0
  ).slice(0, 8); // Limit to 8 results

  const shouldShowDropdown = query.length > 0 && filteredPokemon.length > 0;

  if (!shouldShowDropdown) {
    return null;
  }

  return (
    <div className="autocomplete-dropdown">
      <div className="autocomplete-dropdown-content">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="autocomplete-item"
            onClick={() => onSelect(pokemon.name)}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="autocomplete-item-image"
            />
            <div className="autocomplete-item-info">
              <div className="autocomplete-item-name">{pokemon.name}</div>
              <div className="autocomplete-item-number">#{pokemon.number}</div>
              <div className="autocomplete-item-types">
                {pokemon.types.map(type => (
                  <TypeBadge key={type} type={type} size="sm" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}