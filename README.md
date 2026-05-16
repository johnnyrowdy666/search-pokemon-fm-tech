# search-pokemon-fm-tech

A Next.js TypeScript Pokémon search app for the FM full stack developer test.

## Features

- URL-driven Pokémon search using `?q=bulbasaur`
- Frontend-to-backend communication through a local GraphQL proxy at `/api/graphql`
- Apollo Client caching with Pokémon objects keyed by GraphQL `id`
- Clear loading, empty, error, not-found, and result states
- Full Pokémon detail view including dimensions, types, matchups, attacks, evolution requirements, and evolutions
- Evolution links update the URL query parameter and render the selected Pokémon
- Recent successful searches saved in `localStorage`
- Jest tests for Bulbasaur, Charmander, and Squirtle type mocks

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Data Source

The app queries the documented Pokémon GraphQL API through the local route handler:

```text
https://graphql-pokemon2.vercel.app/
```
