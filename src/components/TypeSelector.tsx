"use client";

import { pokemonTypeNames } from "@/lib/pokemonType";

interface TypeSelectorProps {
  activeType: string | null;
  onSelect: (type: string | null) => void;
}

export function TypeSelector({ activeType, onSelect }: TypeSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onSelect(value || null);
  };

  const handleClear = () => {
    onSelect(null);
  };

  return (
    <div className="type-selector">
      <div className="type-selector-header">
        <span className="filter-label">
          Filter by type
        </span>
        {activeType && (
          <button
            onClick={handleClear}
            type="button"
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>
      <select
        id="type-select"
        value={activeType ?? ""}
        onChange={handleChange}
        className="type-selector-dropdown"
      >
        <option value="">All types</option>
        {pokemonTypeNames.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
