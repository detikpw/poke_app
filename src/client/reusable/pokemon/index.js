import React from "react";
import { Divider } from "../divider";
import { Link } from "../link";
import { Flex, Box } from "../flexbox";
import { Text } from "../typography";
import { Button } from "../button";
import { useCatchedPokemons } from "../../store";

const PokemonCard = ({
  name,
  id,
  image,
  amountOfCatchedPokemons,
  nickname,
}) => {
  const { releasePokemon } = useCatchedPokemons();
  return (
    <Box width={1}>
      <Flex width={1} alignItems="center">
        <Link width={1} to={`/pokemon/${name}`}>
          <Flex alignItems="center">
            <Box as="img" width={1 / 3} src={image} />
            <Box width={2 / 3}>
              <Flex>
                <Text color="alt-2">Name:&nbsp;</Text>
                <Text color="primary">{name}</Text>
              </Flex>
              {amountOfCatchedPokemons && (
                <Flex>
                  <Text color="alt-2">Owned Total:&nbsp;</Text>
                  <Text color="primary">{amountOfCatchedPokemons}</Text>
                </Flex>
              )}
              {nickname && (
                <Flex>
                  <Text color="alt-2">nickname:&nbsp;</Text>
                  <Text color="primary">{nickname}</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        </Link>
        {nickname && (
          <Button
            flexShrink={0}
            bg="white"
            mt={2}
            onClick={() => releasePokemon(id, nickname)}
          >
            <Text fontSize={4}>Release</Text>
          </Button>
        )}
      </Flex>
      <Divider />
    </Box>
  );
};

export { PokemonCard };
