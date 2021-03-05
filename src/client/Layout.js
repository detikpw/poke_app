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
    <Flex height="100vh" flexDirection="column">
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor: theme.colors["bg-1"],
            color: theme.colors.primary,
            fontFamily: theme.fonts.vt323,
            position: "relative",
          },
        })}
      />
      <Flex
        px={4}
        py={2}
        bg="bg-2"
        width={1}
        justifyContent="center"
        sx={{
          top: 0,
          position: "sticky",
        }}
      >
        <Flex
          width={1}
          px={{
            md: 4,
          }}
          maxWidth={{
            md: 640,
          }}
        >
          <Link to="/">
            <Heading color="alt-2">PokeApp</Heading>
          </Link>
          <Link ml="auto" to="/me/pokemon">
            <Text color="alt-2">My Pokemon({amountOfCatchedPokemons})</Text>
          </Link>
        </Flex>
      </Flex>
      <Flex justifyContent="center" width={1}>
        <Box
          p={4}
          width={1}
          maxWidth={{
            md: 640,
          }}
        >
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
      </Flex>
      <Flex
        as="footer"
        mt="auto"
        px={4}
        py={2}
        bg="bg-2"
        width={1}
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "relative",
          bottom: 0,
          left: 0,
        }}
      >
        <Box
          width={1}
          textAlign="center"
          px={{
            md: 4,
          }}
          maxWidth={{
            md: 640,
          }}
        >
          <Box as="span">
            Data provided by &nbsp;
            <Link
              color="alt-2"
              to="https://graphql-pokeapi.vercel.app/api/graphql"
            >
              Pokeapi.
            </Link>
            &nbsp; Color theme{" "}
            <Link color="alt-2" to="https://ethanschoonover.com/solarized/">
              solarized.
            </Link>
          </Box>
        </Box>
        <Box
          width={1}
          textAlign="center"
          px={{
            md: 4,
          }}
          maxWidth={{
            md: 640,
          }}
        >
          <Box as="span">
            Style theme inspired by{" "}
            <Link color="alt-2" to="https://nostalgic-css.github.io/NES.css/">
              Nes.CSS{" "}
            </Link>
          </Box>
          <Box as="span">
            <Link color="alt-2" to="https://github.com/detikpw/poke_app">
              Site Source{" "}
            </Link>
            © 2021
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default layout;
