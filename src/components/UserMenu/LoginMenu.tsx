import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import tokenHandler from "@/utils/tokenHandler";
import { useAtom } from "jotai";
import { isLoginAtom } from "@/App";

export const LoginMenu = () => {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  const [, setIsLogin] = useAtom(isLoginAtom);
  const handleLogout = () => {
    tokenHandler.removeToken();
    setIsLogin(false);
    navigate("/");
  };
  return (
    <Flex gap={1} alignItems="center">
      {/* Desktop */}
      <Flex
        gap={1}
        mr={1}
        color="gray.700"
        display={{ base: "none", md: "inline-flex" }}
      >
        <Button
          name="all-listings-button"
          onClick={() => navigate("/listings")}
          variant="ghost"
          colorScheme="Gray"
        >
          All Listings
        </Button>
        <Menu>
          <MenuButton
            name="menu-button"
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ boxShadow: "md" }}
            _expanded={{ boxShadow: "md" }}
          >
            Menu <HamburgerIcon />
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem
              name="hostedlistings-button"
              onClick={() => navigate("/hostedlistings")}
            >
              Hosted listings
            </MenuItem>
            <MenuDivider />
            <MenuItem name="logout-button" onClick={handleLogout}>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* Mobile */}
      <Box display={{ base: "inline-flex", md: "none" }}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          fontSize="20px"
          colorScheme="gray"
          variant="ghost"
          icon={<HamburgerIcon />}
          onClick={mobileNav.onOpen}
          border="1px"
          borderColor="gray.300"
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
          zIndex="999"
        >
          <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
          <Button
            onClick={() => navigate("/listings")}
            w="full"
            variant="ghost"
            colorScheme="gray"
          >
            All Listings
          </Button>
          <Divider />
          <Button
            onClick={() => navigate("/hostedlistings")}
            w="full"
            variant="ghost"
            colorScheme="gray"
          >
            Hosted listings
          </Button>
          <Divider />
          <Button onClick={handleLogout} w="full">
            Log out
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
