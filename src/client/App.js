import React from 'react';
import { ThemeProvider } from 'theme-ui'
import { hashira } from './theme'
import { Box } from './reusable/flexbox'
import { Heading, Text } from './reusable/typography';

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
        <Box fontFamily="vt323">Hello Bros</Box>
        <Box color="secondary" fontFamily="ps2p">Hello Bros</Box>
        <Box color="alt-1" fontFamily="ps2p">Hello Bros</Box>
        <Box color="alt-2" fontFamily="ps2p">Hello Bros</Box>
        <Heading color="alt-2" fontFamily="ps2p">Hello Bros</Heading>
        <Text color="alt-2" fontFamily="ps2p">Hello Bros</Text>
      </Box>
    </Box>
  </ThemeProvider>
);

export default App
