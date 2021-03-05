import React, { forwardRef } from "react";
import { Box } from "../flexbox";

const Heading = forwardRef((props, ref) => (
  <Box ref={ref} {...props} fontFamily="ps2p" lineHeight="140%" />
));

const Text = ({ fontSize = { md: 24 }, ...styledSystemProps }) => (
  <Box {...styledSystemProps} fontFamily="vt323" fontSize={fontSize} />
);

export { Heading, Text };
