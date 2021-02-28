import React from 'react';
import { ThemeProvider } from 'theme-ui'
import { hashira } from './theme'
import { Box, Flex } from './reusable/flexbox'
import { Heading, Text } from './reusable/typography';
import { Divider } from './reusable/divider';

const App = () => (
  <ThemeProvider theme={hashira}>
    <Box
      height="100%"
      fontFamily="vt323"
      bg="bg-1"
      color="primary"
    >
      <Box px={4} py={2} bg="bg-2">
        <Heading color="alt-2">
          PokeApp
        </Heading>
      </Box>
      <Box p={4}>
        <Heading fontSize={1}>
          Pokemon List
        </Heading>
        <Box mt={4} p={4} bg="bg-2">
          <Box>
            <Flex width={1} alignItems="center">
              <Box as="img" width={1 / 3} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"/>
              <Box width={2 / 3}>
                <Flex>
                  <Text color="alt-2">Name:&nbsp;</Text>
                  <Text color="primary">Meow</Text>
                </Flex>
                <Flex>
                  <Text color="alt-2">Owned Total:&nbsp;</Text>
                  <Text color="primary">0</Text>
                </Flex>
              </Box>
            </Flex>
            <Divider />
          </Box>
          <Box>
            <Flex width={1} alignItems="center">
              <Box as="img" width={1 / 3} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"/>
              <Box width={2 / 3}>
                <Flex>
                  <Text color="alt-2">Name:&nbsp;</Text>
                  <Text color="primary">Meow</Text>
                </Flex>
                <Flex>
                  <Text color="alt-2">Owned Total:&nbsp;</Text>
                  <Text color="primary">0</Text>
                </Flex>
              </Box>
            </Flex>
            <Divider />
          </Box>
          <Box fontFamily="vt323">Hello Bros</Box>
          <Box color="secondary" fontFamily="ps2p">Hello Bros</Box>
          <Box color="alt-1" fontFamily="ps2p">Hello Bros</Box>
          <Box color="alt-2" fontFamily="ps2p">Hello Bros</Box>
          <Heading color="alt-2" fontFamily="ps2p">Hello Bros</Heading>
          <Text color="alt-2" fontFamily="ps2p">Hello Bros</Text>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default App
