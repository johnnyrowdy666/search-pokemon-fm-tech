import Link from "next/link";

type RecentSearchesProps = {
  searches: string[];
};

export function RecentSearches({ searches }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <nav className="recent-row" aria-label="Recent Pokemon searches">
      {searches.map((search) => (
        <Link
          className="chip"
          href={`/?q=${encodeURIComponent(search)}`}
          key={search}
        >
          {search}
        </Link>
      ))}
    </nav>
  );
}
