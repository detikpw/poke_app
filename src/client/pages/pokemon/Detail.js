import React, { useState, useRef, useCallback } from "react";
import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex } from "../../reusable/flexbox/index";
import { Heading, Text } from "../../reusable/typography";
import { Divider } from "../../reusable/divider";
import { Button } from "../../reusable/button";
import { Input } from "../../reusable/form";
import { Dialog, DialogContent } from "../../reusable/dialog";
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

const initialError = null;

const catchPokemon = ({ setError, setDialog, pokemon }) => () => {
  try {
    const probabilitySet = [true, false];
    const result =
      probabilitySet[Math.floor(Math.random() * probabilitySet.length)];
    setDialog(true);
    if (!result)
      throw new FailCatchPokemon(`Ooops ${pokemon.name} failed to catch`);
  } catch (error) {
    setError(error);
  }
};

class FailCatchPokemon extends Error {
  constructor(message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FailCatchPokemon);
    }
  }
}

const setPokemonNickname = ({
  setCatchedPokemons,
  pokemon,
  onClose,
  inputNicknameEl,
  setError,
}) => () => {
  try {
    setCatchedPokemons(pokemon.id, inputNicknameEl.current.value);
    setError(initialError);
    onClose();
  } catch (error) {
    setError(error);
  }
};

const detail = () => {
  const { name } = useParams();
  const { loading, error: errorFetch, data } = useQuery(POKEMON_DETAIL_QUERY, {
    variables: { name },
  });
  const {
    setCatchedPokemons,
    getAmountOfCatchedPokemonsById,
  } = useCatchedPokemons();
  const inputNicknameEl = useRef(null);

  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(initialError);

  const onClose = useCallback(() => {
    setError(initialError);
    setDialog(false);
  }, [error, dialog]);

  if (loading) return null;
  if (errorFetch) return `Error! ${error}`;
  const { pokemon } = data;
  const renderDialogContent =
    error instanceof FailCatchPokemon ? (
      <Flex flexDirection="column">
        <Heading>{error.message}</Heading>
      </Flex>
    ) : (
      <Box>
        <Input ref={inputNicknameEl} label="Give a nickname" maxLength={12} />
        {error instanceof Error && (
          <Text mt={4} color="alt-2">
            {error.message}
          </Text>
        )}
        <Flex mt={4} justifyContent="space-between" width={1}>
          <Button onClick={onClose} bg="white">
            <Heading>CANCEL</Heading>
          </Button>
          <Button
            bg="bg-2"
            onClick={setPokemonNickname({
              setCatchedPokemons,
              inputNicknameEl,
              setError: setError,
              pokemon,
              onClose: onClose,
            })}
          >
            <Heading>SAVE!</Heading>
          </Button>
        </Flex>
      </Box>
    );
  const renderDialog = (
    <Dialog open={dialog} onClose={onClose}>
      <DialogContent>{renderDialogContent}</DialogContent>
    </Dialog>
  );
  const renderPokemonCard = (
    <Box>
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
    </Box>
  );
  const rendermain = (
    <Box>
      {renderDialog}
      <Heading fontSize={1}>{name}</Heading>
      {renderPokemonCard}
      <Flex
        width={1}
        py={2}
        sx={{
          position: "sticky",
          bottom: 0,
        }}
      >
        <Button
          bg="bg-2"
          width={1}
          onClick={catchPokemon({ setDialog, pokemon, setError: setError })}
        >
          <Heading>CATCH</Heading>
        </Button>
      </Flex>
    </Box>
  );
  return rendermain;
};

export default detail;
