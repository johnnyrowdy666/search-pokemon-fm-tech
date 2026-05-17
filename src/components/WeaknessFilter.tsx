"use client";

import { useState } from "react";
import { pokemonTypeNames, getPokemonType, type PokemonTypeName } from "@/lib/pokemonType";

export function WeaknessFilter({
  activeType,
  onSelect
}: {
  activeType: string | null;
  onSelect: (type: string | null) => void;
}) {
  return (
    <div className="weakness-filter">
      <span className="filter-label">Weak against:</span>
      <div className="type-filters">
        {pokemonTypeNames.map((type) => {
          const isActive = activeType?.toLowerCase() === type.toLowerCase();
          const pt = getPokemonType(type);
          return (
            <button
              key={type}
              className={`type-filter-btn ${isActive ? "active" : ""}`}
              onClick={() => onSelect(isActive ? null : type)}
              type="button"
              title={`Show Pokemon weak against ${type}`}
            >
              <img alt="" aria-hidden="true" className="type-icon" src={pt.icon} />
              {type}
            </button>
          );
        })}
        {activeType && (
          <button
            className="clear-btn"
            onClick={() => onSelect(null)}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
