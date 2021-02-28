import React from 'react'
import { Box } from '../flexbox'

const Divider = props => (
  <Box
    {...props}
    as="hr"
    mt={2}
    sx={{
      borderWidth: 1,
      borderColor: 'alt-1',
      borderStyle: 'dashed',
    }}
  />
)

export { Divider }
