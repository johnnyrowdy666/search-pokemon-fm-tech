import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql"
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Pokemon: {
          keyFields: ["id"]
        }
      }
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-first"
      },
      query: {
        fetchPolicy: "cache-first"
      }
    }
  });
}
