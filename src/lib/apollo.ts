import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

const APOLLO_SERVER_URL = process.env.NEXT_PUBLIC_APOLLO_SERVER_URL;

const apolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: APOLLO_SERVER_URL,
    }),
    cache: new InMemoryCache(),
  });
};

export default apolloClient;
