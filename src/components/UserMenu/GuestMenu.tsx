import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const GuestMenu = () => {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  return (
    <Flex display="flex" alignItems="center" gap={1} data-testid="guest-menu">
      {/* Desktop */}
      <Flex
        gap={1}
        mr={1}
        color="gray.700"
        display={{ base: "none", md: "inline-flex" }}
      >
        <Button
          onClick={() => navigate("/listings")}
          variant="ghost"
          colorScheme="Gray"
          data-testid="all-listings"
        >
          All Listings
        </Button>
        <Button
          name="login-button"
          data-testid="login-button"
          onClick={() => navigate("/login")}
          variant="ghost"
          colorScheme="Gray"
        >
          Sign in
        </Button>
        <Button
          name="register-button"
          data-testid="register-button"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
      </Flex>
      {/* Mobile */}
      <Box
        display={{ base: "inline-flex", md: "none" }}
        data-testid="mobile-menu"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          fontSize="20px"
          colorScheme="Gray"
          variant="ghost"
          icon={<HamburgerIcon />}
          onClick={mobileNav.onOpen}
          border="1px"
          borderRadius="2xl"
        />

        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          colorScheme="Gray"
        >
          Home
        </Button>

        <VStack
          pos="absolute"
          top={0}
          left={0}
          right={0}
          display={mobileNav.isOpen ? "flex" : "none"}
          flexDirection="column"
          p={2}
          pb={4}
          m={2}
          spacing={3}
          rounded="sm"
          shadow="sm"
          bg="white"
        >
          <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
          <Button
            onClick={() => navigate("/listings")}
            variant="ghost"
            colorScheme="Gray"
          >
            All Listings
          </Button>
          <Button
            onClick={() => navigate("/login")}
            w="full"
            variant="ghost"
            colorScheme="gray"
          >
            Sign in
          </Button>
          <Button onClick={() => navigate("/register")} w="full">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
