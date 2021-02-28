import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Box, Flex } from '../../reusable/flexbox/index'
import { Heading, Text } from '../../reusable/typography';
import { Divider } from '../../reusable/divider';


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
`

const PokemonCard = ({ name, image }) => (
  <Box>
    <Flex width={1} alignItems="center">
      <Box as="img" width={1 / 3} src={image}/>
      <Box width={2 / 3}>
        <Flex>
          <Text color="alt-2">Name:&nbsp;</Text>
          <Text color="primary">{name}</Text>
        </Flex>
        <Flex>
          <Text color="alt-2">Owned Total:&nbsp;</Text>
          <Text color="primary">0</Text>
        </Flex>
      </Box>
    </Flex>
    <Divider />
  </Box>
)

const list = () => {
  const { loading, error, data } = useQuery(POKEMON_LIST_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Box>
      <Heading fontSize={1}>
        Pokemon List
      </Heading>
      <Box mt={4} p={4} bg="bg-2">
        {data.pokemons.results.map(({ name, image, id }) => (
          <PokemonCard
            key={id}
            name={name}
            image={image}
          />
        ))}
      </Box>
    </Box>
  )
}

export default list
