import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const APOLLO_SERVER_URI = process.env.NEXT_PUBLIC_APOLLO_SERVER_URI;

const apolloClient = () => {
    return new ApolloClient({
      link: new HttpLink({
        uri: APOLLO_SERVER_URI,
      }),
        cache: new InMemoryCache(),
      });
}

export default apolloClient;
