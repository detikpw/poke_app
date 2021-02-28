import React from 'react';
import { ThemeProvider } from 'theme-ui'
import { ApolloClient, InMemoryCache, gql, HttpLink, ApolloProvider } from '@apollo/client';
import fetch from 'cross-fetch';
import { hashira } from './theme'
import { Box, Flex } from './reusable/flexbox'
import { Heading, Text } from './reusable/typography';
import { Divider } from './reusable/divider';
import { List } from './pages/pokemon';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={hashira}>
      <Box
        height="100%"
        fontFamily="vt323"
        bg="bg-1"
        color="primary"
      >
        <Box px={4} py={2} bg="bg-2">
          <Heading color="alt-2">
            PokeApp
          </Heading>
        </Box>
        <Box p={4}>
          <List />
        </Box>
      </Box>
    </ThemeProvider>
  </ApolloProvider>
);

export default App
