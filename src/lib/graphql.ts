import { gql } from "@apollo/client";

export const POKEMON_DETAIL_QUERY = gql`
  query PokemonDetail($name: String) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
        evolutionRequirements {
          amount
          name
        }
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
    }
  }
`;

export const POKEMON_INDEX_QUERY = gql`
  query PokemonIndex($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      classification
      types
      image
    }
  }
`;
