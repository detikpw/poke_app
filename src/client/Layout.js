import React, { useEffect } from "react";
import { Global } from "@emotion/core";
import { Switch, Route } from "react-router";
import { Box, Flex } from "./reusable/flexbox";
import { Heading, Text } from "./reusable/typography";
import { Link } from "./reusable/link";
import { List, Detail } from "./pages/pokemon";
import { MyPokemon } from "./pages/me";
import { useCatchedPokemons } from "./store";

const layout = () => {
  const { initCatchedPokemons, amountOfCatchedPokemons } = useCatchedPokemons();
  useEffect(() => {
    initCatchedPokemons(
      JSON.parse(localStorage.getItem("catchedPokemons")) || {}
    );
  }, []);
  return (
    <Box>
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor: theme.colors["bg-1"],
            color: theme.colors.primary,
            fontFamily: theme.fonts.vt323,
          },
        })}
      />
      <Flex
        px={4}
        py={2}
        bg="bg-2"
        sx={{
          top: 0,
          position: "sticky",
        }}
      >
        <Link to="/">
          <Heading color="alt-2">PokeApp</Heading>
        </Link>
        <Link ml="auto" to="/me/pokemon">
          <Text color="alt-2">My Pokemon({amountOfCatchedPokemons})</Text>
        </Link>
      </Flex>
      <Box p={4}>
        <Switch>
          <Route path="/pokemon/:name">
            <Detail />
          </Route>
          <Route path="/me/pokemon">
            <MyPokemon />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default layout;
