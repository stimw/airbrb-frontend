import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoginAtom } from "@/App";
import { GuestMenu } from "@/components/UserMenu/GuestMenu";
import { LoginMenu } from "@/components/UserMenu/LoginMenu";

import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import {
  LinkBox,
  Flex,
  Image,
  LinkOverlay,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "@/assets/logo.png";

export const useNavbar = () => {
  // from chakra-ui https://chakra-ui.com/
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const boxShadow = useColorModeValue("sm", "sm-dark");

  useEffect(() => {
    return scrollY.onChange(() => setIsScrolled(scrollY.get() > 16));
  }, [scrollY]);

  return {
    rootProps: {
      shadow: isScrolled ? boxShadow : "none",
      transition: "box-shadow 0.2s",
    },
  };
};

export function Header() {
  const [isLogin] = useAtom(isLoginAtom);
  const { rootProps } = useNavbar();

  return (
    <Box
      as="nav"
      role="navigation"
      position="sticky"
      top="0"
      zIndex="docked"
      bg="white"
      px={{ base: "4", md: "8" }}
      py={3}
      {...rootProps}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <LinkBox display={{ base: "none", md: "flex" }}>
          <LinkOverlay id="logo-link" as={RouterLink} to="/" />
          <Image src={logo} alt="logo" height="40px" objectFit="scale-down" />
        </LinkBox>
        {isLogin ? <LoginMenu /> : <GuestMenu />}
      </Flex>
    </Box>
  );
}
