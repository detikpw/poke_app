import React, { forwardRef } from "react";
import { Box } from "../flexbox";
import { Text, Heading } from "../typography";

// css style for input from https://nostalgic-css.github.io/NES.css/
const Input = forwardRef(({ label, ...styledDesignProps }, ref) => (
  <Box {...styledDesignProps}>
    <Text as="label" fontSize={4}>
      {label}
    </Text>
    <Heading
      ref={ref}
      as="input"
      mt={2}
      width={1}
      p={2}
      textAlign="center"
      css={{
        borderStyle: "solid",
        borderWidth: 4,
        borderImageSlice: 2,
        borderImageWidth: 2,
        borderImageRepeat: "stretch",
        borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>')`,
        borderImageOutset: 2,
      }}
    />
  </Box>
));

const Form = ({ children, ...styledDesignProps }) => (
  <Box {...styledDesignProps} as="form">
    {children}
  </Box>
);

export { Input, Form };
