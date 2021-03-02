import React, { useEffect } from "react";
import { Global } from "@emotion/core";
import { Switch, Route } from "react-router";
import { Box } from "./reusable/flexbox";
import { Heading } from "./reusable/typography";
import { Link } from "./reusable/link";
import { List, Detail } from "./pages/pokemon";
import { useCatchedPokemons } from "./store";

const layout = () => {
  const { initCatchedPokemons } = useCatchedPokemons();
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
      <Box
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
      </Box>
      <Box p={4}>
        <Switch>
          <Route path="/pokemon/:name">
            <Detail />
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
