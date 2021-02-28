import React from 'react';
import { ThemeProvider } from 'theme-ui'
import { hashira } from './theme'
import { Box } from './reusable/flexbox'

const App = () => (
  <ThemeProvider theme={hashira}>
    <Box p={4}>
      <Box fontFamily="vt323">Hello Bros</Box>
      <Box fontFamily="ps2p">Hello Bros</Box>
    </Box>
  </ThemeProvider>
);

export default App
