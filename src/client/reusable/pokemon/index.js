import React from "react";
import { Divider } from "../divider";
import { Link } from "../link";
import { Flex, Box } from "../flexbox";
import { Text } from "../typography";

const PokemonCard = ({ name, image, amountOfCatchedPokemons, nickname }) => (
  <Link to={`/pokemon/${name}`}>
    <Flex width={1} alignItems="center">
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
    <Divider />
  </Link>
);

export { PokemonCard };
