import React from "react";
import { Box } from "../flexbox";
const DialogContent = ({ children, ...styledSystemProps }) => (
  <Box
    {...styledSystemProps}
    bg="bg-1"
    width={7 / 8}
    m="auto"
    py={6}
    px={4}
    onClick={(e) => e.stopPropagation()}
    sx={{
      borderWidth: 4,
      borderStyle: "solid",
      borderColor: "alt-2",
    }}
  >
    {children}
  </Box>
);

const Dialog = ({ open, onClose, children, ...styledSystemProps }) =>
  open && (
    <Box
      {...styledSystemProps}
      pt={100}
      width={1}
      height="100%"
      bg="rgba(0,0,0,0.1)"
      onClick={onClose}
      sx={{
        position: "fixed",
        zIndex: 2,
        left: 0,
        top: 0,
      }}
    >
      {children}
    </Box>
  );

export { Dialog, DialogContent };
