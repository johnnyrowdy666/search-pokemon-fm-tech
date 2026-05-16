import type { ApolloError } from "@apollo/client";
import Link from "next/link";
import type { Pokemon, PokemonAttack, PokemonPreview } from "@/lib/pokemon";
import { TypeBadge } from "@/components/TypeBadge";

type PokemonResultProps = {
  error?: ApolloError;
  isEmpty: boolean;
  loading: boolean;
  closestPokemon: PokemonPreview | null;
  pokemon: Pokemon | null;
  searchTerm: string;
};

export function PokemonResult({
  error,
  isEmpty,
  loading,
  closestPokemon,
  pokemon,
  searchTerm
}: PokemonResultProps) {
  if (isEmpty) {
    return (
      <section className="panel state-panel">
        <h2>Start with a Pokemon name</h2>
        <p>Search your favorite Pokemon! For example, &quot;Pikachu&quot;.</p>
        <p> Note: We have only some pokemon in our API.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="panel state-panel" aria-live="polite">
        <h2>Searching...</h2>
        <p>Looking up {searchTerm} through the GraphQL proxy.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel state-panel" role="alert">
        <h2>Search failed</h2>
        <p className="error-text">{error.message}</p>
      </section>
    );
  }

  if (!pokemon) {
    return (
      <section className="panel state-panel">
        <h2>No Pokemon found</h2>
        <p>No result exists for &quot;{searchTerm}&quot;.</p>
        {closestPokemon ? (
          <Link
            className="suggestion-card"
            href={`/?q=${encodeURIComponent(closestPokemon.name)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={closestPokemon.image} />
            <span>
              <strong>Closest match: {closestPokemon.name}</strong>
              <small>#{closestPokemon.number}</small>
              <span className="inline-type-row">
                {closestPokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} size="lg" />
                ))}
              </span>
            </span>
          </Link>
        ) : null}
      </section>
    );
  }

  return (
    <article className="panel pokemon-card">
      <header className="pokemon-hero">
        <div className="pokemon-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={pokemon.name}
            className="pokemon-image"
            src={pokemon.image}
          />
        </div>

        <div>
          <div className="pokemon-title">
            <h2>{pokemon.name}</h2>
            <span className="number-pill">#{pokemon.number}</span>
          </div>
          <p className="classification">{pokemon.classification}</p>
          <div className="hero-types">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} size="lg" />
            ))}
          </div>

          <dl className="stats-grid">
            <Stat label="Max CP" value={pokemon.maxCP} />
            <Stat label="Max HP" value={pokemon.maxHP} />
            <Stat label="Flee rate" value={`${pokemon.fleeRate}`} />
            <Stat label="Number" value={`#${pokemon.number}`} />
          </dl>
        </div>
      </header>

      <div className="content-grid">
        <DetailSection title="Dimensions">
          <ul className="dimension-list">
            <Dimension label="Height" value={pokemon.height} />
            <Dimension label="Weight" value={pokemon.weight} />
          </ul>
        </DetailSection>

        <DetailSection title="Types">
          <TagList values={pokemon.types} />
        </DetailSection>

        <DetailSection title="Resistant">
          <TagList values={pokemon.resistant} />
        </DetailSection>

        <DetailSection title="Weaknesses">
          <TagList values={pokemon.weaknesses} />
        </DetailSection>

        <DetailSection title="Fast attacks" wide>
          <AttackList attacks={pokemon.attacks.fast} />
        </DetailSection>

        <DetailSection title="Special attacks" wide>
          <AttackList attacks={pokemon.attacks.special} />
        </DetailSection>

        <DetailSection title="Evolution requirements">
          {pokemon.evolutionRequirements ? (
            <p className="hint">
              {pokemon.evolutionRequirements.amount}{" "}
              {pokemon.evolutionRequirements.name}
            </p>
          ) : (
            <p className="hint">No further evolution requirement listed.</p>
          )}
        </DetailSection>

        <DetailSection title="Evolutions">
          {pokemon.evolutions?.length ? (
            <div className="evolution-list">
              {pokemon.evolutions.map((evolution) => (
                <Link
                  className="evolution-card"
                  href={`/?q=${encodeURIComponent(evolution.name)}`}
                  key={evolution.id}
                >
               
                  <img alt={evolution.name} src={evolution.image} />
                  <span className="evolution-copy">
                    <strong>{evolution.name}</strong>
                    <small>#{evolution.number}</small>
                    <span className="inline-type-row">
                      {evolution.types.map((type) => (
                        <TypeBadge key={type} type={type} />
                      ))}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="hint">No evolutions listed.</p>
          )}
        </DetailSection>
      </div>
    </article>
  );
}

function DetailSection({
  children,
  title,
  wide = false
}: {
  children: React.ReactNode;
  title: string;
  wide?: boolean;
}) {
  return (
    <section className={wide ? "detail-section wide" : "detail-section"}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="stat-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Dimension({
  label,
  value
}: {
  label: string;
  value: { minimum: string; maximum: string };
}) {
  return (
    <li className="dimension-card">
      <strong>{label}</strong>
      <span>
        {value.minimum} to {value.maximum}
      </span>
    </li>
  );
}

function TagList({ values }: { values: string[] }) {
  if (values.length === 0) {
    return <p className="hint">None listed.</p>;
  }

  return (
    <ul className="tag-list">
      {values.map((value) => (
        <li key={value}>
          <TypeBadge type={value} />
        </li>
      ))}
    </ul>
  );
}

function AttackList({ attacks }: { attacks: PokemonAttack[] }) {
  if (attacks.length === 0) {
    return <p className="hint">No attacks listed.</p>;
  }

  return (
    <ul className="attack-list">
      {attacks.map((attack) => (
        <li className="attack-card" key={`${attack.name}-${attack.type}`}>
          <strong>{attack.name}</strong>
          <span className="attack-meta">
            <TypeBadge type={attack.type} size="md"/>
            <small>{attack.damage} damage</small>
          </span>
        </li>
      ))}
    </ul>
  );
}
