import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Header } from "../Header";
import { ChildrenProps } from "@/types";
import { Footer } from "../Footer";

export const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <Flex direction="column" h="100vh" ml={{ base: 1 }}>
        <Header />
        <Box flex={1} px={{ base: "2", md: "20" }}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  );
};
