import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex } from "../../reusable/flexbox/index";
import { Heading, Text } from "../../reusable/typography";
import { Divider } from "../../reusable/divider";
import { Button } from "../../reusable/button";
import { Input } from "../../reusable/form";
import { useCatchedPokemons } from "../../store";

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

const catchPokemon = (setCatchedPokemons, id) => () => {
  setCatchedPokemons(id, Math.random().toString(36).substring(7));
};

const detail = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(POKEMON_DETAIL_QUERY, {
    variables: { name },
  });
  const {
    setCatchedPokemons,
    getAmountOfCatchedPokemonsById,
  } = useCatchedPokemons();

  const [dialog, setDialog] = useState(false);

  if (loading) return null;
  if (error) return `Error! ${error}`;
  const { pokemon } = data;
  return (
    <Box>
      {dialog && (
        <Box
          pt={100}
          width={1}
          height="100%"
          bg="rgba(0,0,0,0.1)"
          onClick={() => setDialog(false)}
          sx={{
            position: "fixed",
            zIndex: 2,
            left: 0,
            top: 0,
          }}
        >
          <Box
            bg="bg-1"
            width={7 / 8}
            m="auto"
            py={6}
            px={8}
            onClick={(e) => e.stopPropagation()}
            sx={{
              borderWidth: 4,
              borderStyle: "solid",
              borderColor: "alt-2",
            }}
          >
            <Input label="Give a nickname" />
          </Box>
        </Box>
      )}
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
            {getAmountOfCatchedPokemonsById(pokemon.id)}
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
        <Button bg="bg-2" onClick={() => setDialog(!dialog)}>
          <Heading>CATCH</Heading>
        </Button>
      </Flex>
    </Box>
  );
};

export default detail;
