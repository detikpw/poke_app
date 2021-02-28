import React from 'react';
import { ThemeProvider } from 'theme-ui'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import fetch from 'cross-fetch';
import { Global } from '@emotion/core'
import { hashira } from './theme'
import { Box } from './reusable/flexbox'
import { Heading } from './reusable/typography';
import { List } from './pages/pokemon';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={hashira}>
      <Global
        styles={theme => ({
          body: {
            backgroundColor: theme.colors['bg-1'],
            color: theme.colors.primary,
            fontFamily: theme.fonts.vt323
          }
        })}
      />
      <Box
        px={4}
        py={2}
        bg="bg-2"
        sx={{
          top: 0,
          position: 'sticky'
        }}
      >
      <Heading color="alt-2">
        PokeApp
      </Heading>
      </Box>
      <Box p={4}>
        <List />
      </Box>
    </ThemeProvider>
  </ApolloProvider>
);

export default App
