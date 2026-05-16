const RECENT_SEARCHES_KEY = "search-pokemon-fm-tech:recent-searches";
const MAX_RECENT_SEARCHES = 6;

export function readRecentSearches() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter(isString) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(search: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const normalized = search.trim();

  if (!normalized) {
    return readRecentSearches();
  }

  const searches = readRecentSearches();
  const nextSearches = [
    normalized,
    ...searches.filter(
      (item) => item.toLowerCase() !== normalized.toLowerCase()
    )
  ].slice(0, MAX_RECENT_SEARCHES);

  window.localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(nextSearches)
  );

  return nextSearches;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}
