import {
  As,
  Box,
  Heading,
  HStack,
  Icon,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

type Props = {
  icon: As;
  label: string;
  value: string;
};

export const Stat = (props: Props) => {
  const { label, value, icon } = props;
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="white"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      data-testid="stat"
    >
      <Stack spacing={{ base: "5", md: "6" }}>
        <Stack direction="row" justify="space-between">
          <HStack spacing="4">
            <Square size="12" bg="bg-accent-subtle" borderRadius="md">
              <Icon data-testid="icon" as={icon} boxSize="6" />
            </Square>
            <Text fontWeight="medium">{label}</Text>
          </HStack>
        </Stack>
        <Stack spacing="4">
          <Heading size={{ base: "sm", md: "md" }} ml={8}>
            {value}
          </Heading>
        </Stack>
      </Stack>
    </Box>
  );
};
