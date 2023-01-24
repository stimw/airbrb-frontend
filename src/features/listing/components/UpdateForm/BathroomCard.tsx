import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Schema } from "./UpdateForm";
import { CardProps } from "../../types";

export const BathroomCard = (props: CardProps) => {
  const listing = props.listing;
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Box
      bg="bg-surface"
      boxShadow="md"
      borderRadius="lg"
      flex="1"
      maxW={{ lg: "3xl" }}
    >
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <FormControl isInvalid={!!errors?.metadata?.bathrooms} isRequired>
          <FormLabel htmlFor={`metadata.bathrooms`}>Bathroom</FormLabel>
          <NumberInput defaultValue={listing.metadata.bathrooms} min={0}>
            <NumberInputField
              id={`metadata.bathrooms`}
              {...register(`metadata.bathrooms`, {
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Divider />
    </Box>
  );
};
