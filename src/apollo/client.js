import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

let apolloClient;

const createIsomorphicLink = () => {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const schema = require("./schema").default;
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: "/api",
      credentials: "same-origin",
    });
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) _apolloClient.cache.restore(initialState);
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState) => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};
