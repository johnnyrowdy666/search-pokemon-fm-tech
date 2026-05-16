import Image from "next/image";
import {
  getPokemonType,
  type PokemonTypeName,
  pokemonTypeNames
} from "@/lib/pokemonType";

type TypeBadgeProps = {
  type: string;
  size?: "sm" | "md" | "lg";
};

export function TypeBadge({ type, size = "md" }: TypeBadgeProps) {
  const pokemonType = getPokemonType(type);

  return (
    <span className={`type-badge type-${pokemonType.slug} type-${size}`}>
   <img
    alt=""
    aria-hidden="true"
    className="type-icon"
    src={pokemonType.icon}
    />
      {pokemonType.name}
    </span>
  );
}

export type { PokemonTypeName };
export { pokemonTypeNames };
