import Image from "next/image";
import {
  getPokemonType,
  type PokemonTypeName,
  pokemonTypeNames
} from "@/lib/pokemonType";

type TypeBadgeProps = {
  type: string;
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const pokemonType = getPokemonType(type);

  return (
    <span className={`type-badge type-${pokemonType.slug}`}>
      <Image
        alt=""
        aria-hidden="true"
        className="type-icon"
        height={5}
        src={pokemonType.icon}
        width={5}
      />
      {pokemonType.name}
    </span>
  );
}

export type { PokemonTypeName };
export { pokemonTypeNames };
