"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SiteNav() {
  const searchParams = useSearchParams();
  const hasPokemonDetail = Boolean(searchParams.get("q")?.trim());

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <span className="nav-spacer" aria-hidden="true" />
      <Link href="/" aria-label="Go to home">
        <Image
          alt="Pokemon"
          className="pokemon-logo"
          height={121}
          priority
          src="/logo.svg"
          width={300}
        />
      </Link>
      <span className="nav-spacer" aria-hidden="true" />
    </nav>
  );
}
