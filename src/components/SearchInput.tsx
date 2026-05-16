"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SearchInputProps = {
  isSearching: boolean;
  value: string;
};

export function SearchInput({ isSearching, value }: SearchInputProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [draft, setDraft] = useState(value);
  const hasDraft = draft.trim().length > 0;
  const isSynced = draft.trim() === value.trim();

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
  }

  function handleClear() {
    setDraft("");
    navigateToSearch(pathname, router.replace, "");
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
            aria-describedby="pokemon-search-help"
            id="pokemon-search"
            className="search-input"
            name="q"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Try Bulbasaur, Charmander, or Squirtle"
            type="search"
            value={draft}
          />
          {hasDraft ? (
            <button
              aria-label="Clear Pokemon search"
              className="clear-button"
              onClick={handleClear}
              type="button"
            >
              x
            </button>
          ) : null}
        </div>
      </div>
      <p className="hint" id="pokemon-search-help">
        Results update automatically as you type, and the URL stays shareable.
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
