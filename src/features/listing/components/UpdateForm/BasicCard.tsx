import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
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

export const BasicCard = (props: CardProps) => {
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
        <FormControl isInvalid={!!errors?.title} isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            {...register("title")}
            defaultValue={listing.title}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="propertyType">Property Type</FormLabel>
          <Select
            id="propertyType"
            {...register("metadata.propertyType")}
            defaultValue={listing.metadata.propertyType}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="uniqueSpace">Unique Space</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors?.price} isRequired>
          <FormLabel htmlFor={`metadata.price`}>
            Price (AUD / per night)
          </FormLabel>
          <NumberInput defaultValue={listing.price} min={0}>
            <NumberInputField
              id={`price`}
              {...register(`price`, {
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
