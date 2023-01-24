import {
  Box,
  BoxProps,
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
import { Schema } from "./CreateForm";

export const BathroomCard = (props: BoxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Box bg="bg-surface" boxShadow="md" borderRadius="lg" {...props} flex="1">
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <FormControl isInvalid={!!errors?.price} isRequired>
          <FormLabel htmlFor={`metadata.price`}>Bathrooms</FormLabel>
          <NumberInput defaultValue={0} min={0}>
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
