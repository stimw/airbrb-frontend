import {
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Text,
  BoxProps,
  Box,
  Button,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";
import * as React from "react";

export const Footer = (props: BoxProps) => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      position="sticky"
      left="0"
      right="0"
      bottom="0"
      zIndex="docked"
      bg="white"
      {...props}
    >
      <Divider />
      <Stack
        py={2}
        px={{ base: "4", md: "8" }}
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Airbrb, Inc. All rights reserved.
        </Text>
        <ButtonGroup variant="ghost" colorScheme="gray">
          <Button leftIcon={<RiGlobalLine />}>English (Australia)</Button>
          <Button leftIcon={<BiDollar />}>AUD</Button>
          <Box display={{ base: "none", md: "block" }}>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </Box>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};
