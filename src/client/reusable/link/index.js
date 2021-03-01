import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box } from "../flexbox";

const Link = (props) => (
  <Box
    {...props}
    as={ReactRouterLink}
    css={{
      textDecoration: "none",
    }}
  />
);

export { Link };
