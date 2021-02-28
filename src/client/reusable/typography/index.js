import React from 'react'
import { Box } from '../flexbox';

const Heading = props => (
  <Box {...props} fontFamily="ps2p" lineHeight="140%" />
)

const Text = props => (
  <Box {...props} fontFamily="vt323" lineHeight="140%" />
)

export { Heading, Text }
