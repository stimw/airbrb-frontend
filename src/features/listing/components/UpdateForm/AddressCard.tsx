import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Schema } from "./UpdateForm";
import { CardProps } from "../../types";

export const AddressCard = (props: CardProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  const listing = props.listing;

  return (
    <Box
      bg="bg-surface"
      boxShadow="md"
      borderRadius="lg"
      maxW={{ lg: "3xl" }}
      flex="1"
    >
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors?.address?.state} isRequired>
            <FormLabel htmlFor="street">Street</FormLabel>
            <Input
              id="street"
              {...register("address.street")}
              defaultValue={listing.address.street}
            />
            <FormErrorMessage>
              {errors?.address?.state?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.address?.city} isRequired>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              {...register("address.city")}
              defaultValue={listing.address.city}
            />
            <FormErrorMessage>
              {errors?.address?.city?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors?.address?.state} isRequired>
            <FormLabel htmlFor="state">State / Province</FormLabel>
            <Input
              id="state"
              {...register("address.state")}
              defaultValue={listing.address.state}
            />
            <FormErrorMessage>
              {errors?.address?.state?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.address?.postcode} isRequired>
            <FormLabel htmlFor="postcode">ZIP/ Postal Code</FormLabel>
            <Input
              id="postcode"
              {...register("address.postcode", {
                valueAsNumber: true,
              })}
              defaultValue={listing.address.postcode}
            />
            <FormErrorMessage>
              {errors?.address?.postcode?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.address?.country} isRequired>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              defaultValue={listing.address.country}
              {...register("address.country")}
            />
            <FormErrorMessage>
              {errors?.address?.country?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
};
