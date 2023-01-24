import {
  Box,
  BoxProps,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Schema } from "./CreateForm";

export const AddressCard = (props: BoxProps) => {
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
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors?.address?.state} isRequired>
            <FormLabel htmlFor="street">Street</FormLabel>
            <Input id="street" {...register("address.street")} />
            <FormErrorMessage>
              {errors?.address?.state?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.address?.city} isRequired>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" {...register("address.city")} />
            <FormErrorMessage>
              {errors?.address?.city?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors?.address?.state} isRequired>
            <FormLabel htmlFor="state">State / Province</FormLabel>
            <Input id="state" {...register("address.state")} />
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
            />
            <FormErrorMessage>
              {errors?.address?.postcode?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.address?.country} isRequired>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              defaultValue="Australia"
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
