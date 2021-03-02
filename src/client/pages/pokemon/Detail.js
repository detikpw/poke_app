import React from "react";
import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex } from "../../reusable/flexbox/index";
import { Heading, Text } from "../../reusable/typography";
import { Divider } from "../../reusable/divider";
import { Button } from "../../reusable/button";
import { setCatchedPokemons } from "../../store";

const POKEMON_DETAIL_QUERY = gql`
  query GetPokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`;

const collectionToString = (collection, key) =>
  collection.map((obj) => obj[key].name).join(", ");

const catchPokemon = (id) => () => {
  console.log("------------------------------------");
  console.log({ id });
  console.log("------------------------------------");
  setCatchedPokemons(id, "test");
};

const detail = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(POKEMON_DETAIL_QUERY, {
    variables: { name },
  });

  const { catchedPokemons } =
    useQuery(gql`
      query getCatchedPokemons {
        catchedPokemons @client
      }
    `).data || {};

  console.log("------------------------------------");
  console.log({ catchedPokemons });
  console.log("------------------------------------");

  if (loading) return null;
  if (error) return `Error! ${error}`;
  const { pokemon } = data;
  return (
    <Box>
      <Heading fontSize={1}>{name}</Heading>
      <Box mt={4} width={1}>
        <Box
          as="img"
          mr={2}
          width={1 / 3}
          src={pokemon.sprites.front_default}
          sx={{
            float: "left",
          }}
        />
        <Box
          as="pre"
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          <Text as="span" color="alt-2">
            Owned Total: &nbsp;
          </Text>
          <Text as="span" color="primary">
            0
          </Text>
        </Box>
        <Box
          as="pre"
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          <Text as="span" color="alt-2">
            Types: &nbsp;
          </Text>
          <Text as="span" color="primary">
            {collectionToString(pokemon.types, "type")}
          </Text>
        </Box>
        <Box
          as="span"
          as="pre"
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          <Text color="alt-2">Moves:&nbsp;</Text>
          <Text color="primary">
            {collectionToString(pokemon.moves, "move")}
          </Text>
        </Box>
      </Box>
      <Divider />
      <Flex
        width={1}
        py={2}
        sx={{
          position: "sticky",
          bottom: 0,
        }}
      >
        <Button bg="bg-2" onClick={catchPokemon(pokemon.id)}>
          <Heading>CATCH</Heading>
        </Button>
      </Flex>
    </Box>
  );
};

export default detail;
