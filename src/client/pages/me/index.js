import React from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { Box } from "../../reusable/flexbox";
import { Heading, Text } from "../../reusable/typography";
import { PokemonCard } from "../../reusable/pokemon/index";
import { useCatchedPokemons } from "../../store";

const POKEMON_LIST_QUERY = gql`
  query GetPokemonList {
    pokemons(limit: 40) {
      results {
        name
        image
        url
        id
      }
    }
  }
`;

const getPokemonItemById = (client, id) =>
  client.readFragment({
    id: `PokemonItem:${id}`,
    fragment: gql`
      fragment MyPokemon on PokemonItem {
        name
        image
      }
    `,
  });
const MyPokemon = () => {
  const { loading, error, data } = useQuery(POKEMON_LIST_QUERY);
  const { catchedPokemons } = useCatchedPokemons();
  const client = useApolloClient();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  const { pokemon } = data;
  const renderPokemonCards = Object.entries(catchedPokemons).reduce(
    (acc, [pokemonId, nicknames]) => {
      const { name, image } = getPokemonItemById(client, pokemonId);
      const renderNicknameCards = nicknames.map((nickname) => (
        <PokemonCard
          key={`${pokemonId}:${nickname}`}
          name={name}
          image={image}
          nickname={nickname}
        />
      ));
      return [...acc, ...renderNicknameCards];
    },
    []
  );
  return (
    <Box>
      <Heading>My Pokemon</Heading>
      {renderPokemonCards}
    </Box>
  );
};

export { MyPokemon };
