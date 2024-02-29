import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apollo";

export const WithApollo = ({ children }: any) => {
  return <ApolloProvider client={apolloClient()}>{children}</ApolloProvider>;
};
