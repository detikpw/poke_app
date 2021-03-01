import React from "react";
import { Box } from "../flexbox";

// css style for button from https://nostalgic-css.github.io/NES.css/
const Button = (props) => (
  <Box
    {...props}
    as="button"
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
      position: "relative",
      display: "inline-block",
      verticalAlign: "middle",
      userSelect: "none",
    }}
  />
);

export { Button };
