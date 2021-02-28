import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  // uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch }),
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetPokemonCollection {
        pokemons {
          results {
            name
            image
            url
            id
          }
        }
      }
    `
  })
  .then(result => console.log(result));



