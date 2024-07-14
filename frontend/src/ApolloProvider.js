import { InMemoryCache, createHttpLink, ApolloClient } from "@apollo/client";
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
