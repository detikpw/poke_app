import React, { forwardRef } from "react";
import { Box } from "../flexbox";

const Heading = forwardRef((props, ref) => (
  <Box ref={ref} {...props} fontFamily="ps2p" lineHeight="140%" />
));

const Text = (props) => <Box {...props} fontFamily="vt323" />;

export { Heading, Text };
