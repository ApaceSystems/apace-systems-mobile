import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Platform } from "react-native";

const getServerUrl = (): string => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000/graphql"; // android phones
    } else if (Platform.OS === "ios") {
      return "http://192.168.0.19:3000/graphql"; // iPhone
      // return 'http://localhost:3000/graphql';
    } else {
      // For web
      return "http://localhost:3000/graphql";
    }
  }
  // For production, replace production server URL
  return "http://0.0.0.0:3000/graphql";
};

const httpLink = createHttpLink({
  uri: getServerUrl(),
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]:`, networkError);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default client;
