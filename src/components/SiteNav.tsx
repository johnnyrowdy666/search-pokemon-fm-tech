"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SiteNav() {
  const searchParams = useSearchParams();
  const hasPokemonDetail = Boolean(searchParams.get("q")?.trim());

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {hasPokemonDetail ? (
        <Link className="nav-link" href="/">
          Home
        </Link>
      ) : (
        <span className="nav-spacer" aria-hidden="true" />
      )}
      <Image
        alt="Pokemon"
        className="pokemon-logo"
        height={121}
        priority
        src="/logo.svg"
        width={300}
      />
      <span className="nav-spacer" aria-hidden="true" />
    </nav>
  );
}
