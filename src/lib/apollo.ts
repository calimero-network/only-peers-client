import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apolloClient = () => {
    return new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:8000",
      }),
        cache: new InMemoryCache(),
      });
}

export default apolloClient;