"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AutocompleteDropdown } from "@/components/AutocompleteDropdown";
import type { PokemonPreview } from "@/lib/pokemon";

type SearchInputProps = {
  isSearching: boolean;
  value: string;
  allPokemon: PokemonPreview[];
};

export function SearchInput({ isSearching, value, allPokemon }: SearchInputProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [draft, setDraft] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDraft((currentDraft) =>
        currentDraft.trim() === value.trim() ? currentDraft : value
      );
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (draft.trim() === value.trim()) {
        return;
      }

      navigateToSearch(pathname, router.replace, draft);
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [draft, pathname, router, value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateToSearch(pathname, router.push, draft);
    setShowDropdown(false);
  }

  function handleClear() {
    setDraft("");
    setShowDropdown(false);
    navigateToSearch(pathname, router.replace, "");
  }

  function handleSelectPokemon(pokemonName: string) {
    setDraft(pokemonName);
    setShowDropdown(false);
    navigateToSearch(pathname, router.push, pokemonName);
  }

  function handleInputFocus() {
    setShowDropdown(true);
  }

  function handleInputBlur() {
    // Use a small delay to allow click events on dropdown items to register
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-header">
        <label className="search-label" htmlFor="pokemon-search">
          Search Pokemon by name
        </label>
      </div>
      <div className="search-row">
        <div className="search-input-wrap">
          <input
            ref={inputRef}
            aria-describedby="pokemon-search-help"
            id="pokemon-search"
            className={`search-input ${isSearching ? 'searching' : ''}`}
            name="q"
            onChange={(event) => {
              setDraft(event.target.value);
              setShowDropdown(true);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Try Bulbasaur, Charmander, or type:Fire"
            type="search"
            value={draft}
          />
   
          {showDropdown && (
            <AutocompleteDropdown
              query={draft}
              allPokemon={allPokemon}
              onSelect={handleSelectPokemon}
            />
          )}
        </div>
      </div>
      <p className="hint" id="pokemon-search-help">
        Results update automatically as you type, and the URL stays shareable. Try "type:fire" to browse by type.
      </p>
    </form>
  );
}

function navigateToSearch(
  pathname: string,
  navigate: (href: string, options?: { scroll?: boolean }) => void,
  search: string
) {
  const trimmedSearch = search.trim();
  const nextPath = trimmedSearch
    ? `${pathname}?q=${encodeURIComponent(trimmedSearch)}`
    : pathname;

  navigate(nextPath, { scroll: false });
}
