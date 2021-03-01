import React from "react";
import { ThemeProvider } from "theme-ui";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import fetch from "cross-fetch";
import { BrowserRouter as Router } from "react-router-dom";
import { hashira } from "./theme";
import Layout from "./Layout";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    fetch,
  }),
  cache: new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__)),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={hashira}>
        <Layout />
      </ThemeProvider>
    </Router>
  </ApolloProvider>
);

export default App;
