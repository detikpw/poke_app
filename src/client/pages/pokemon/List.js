import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box } from "../../reusable/flexbox/index";
import { Heading } from "../../reusable/typography";
import { PokemonCard } from "../../reusable/pokemon";
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

const list = () => {
  const { loading, error, data } = useQuery(POKEMON_LIST_QUERY);
  const { getAmountOfCatchedPokemonsById } = useCatchedPokemons();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Box>
      <Heading fontSize={1}>Pokemon List</Heading>
      <Box mt={4} p={4} bg="bg-2">
        {data.pokemons.results.map(({ name, image, id }) => (
          <PokemonCard
            key={id}
            name={name}
            image={image}
            amountOfCatchedPokemons={getAmountOfCatchedPokemonsById(id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default list;
