import { Box } from "@chakra-ui/react";
import * as React from "react";
import { ChildrenProps } from "@/types";

export const Sidebar = ({ children }: ChildrenProps) => {
  return (
    <Box
      as="aside"
      role="complementary"
      bg="bg-accent"
      width={{ base: "full", lg: "sm" }}
      alignSelf="start"
      position={{ base: "unset", lg: "sticky" }}
      top="0"
    >
      {children}
    </Box>
  );
};
