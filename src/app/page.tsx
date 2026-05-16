import { Suspense } from "react";
import { ApolloProvider } from "@/components/ApolloProvider";
import { PokemonSearchApp } from "@/components/PokemonSearchApp";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <main className="page-shell">
      <Suspense fallback={<div className="site-nav nav-loading" />}>
        <SiteNav />
      </Suspense>

      <ApolloProvider>
        <Suspense fallback={<div className="panel">Loading search...</div>}>
          <PokemonSearchApp />
        </Suspense>
      </ApolloProvider>
    </main>
  );
}
