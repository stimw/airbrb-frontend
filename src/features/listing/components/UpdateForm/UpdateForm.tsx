import {
  Box,
  Button,
  Stack,
  StackDivider,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { AddressCard } from "./AddressCard";
import { BasicCard } from "./BasicCard";
import { BedroomCard } from "./BedroomCard";
import { AmenitiesCard } from "./AmenitiesCard";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { DevTool } from "@hookform/devtools";
import * as z from "zod";
import { UploadCard } from "./UploadCard";

import { useUpdateHostedMutation } from "@/features/listing/hooks/useUpdateHostedMutation";
import { useGetListingDetailsQuery } from "@/features/listing/hooks/useGetListingDetailsQuery";
import { ListingDetails } from "../../types";
import { BathroomCard } from "./BathroomCard";

const schema = z.object({
  title: z.string().min(1, "Required"),
  address: z.object({
    street: z.string().min(1, "Required"),
    city: z.string().min(1, "Required"),
    state: z.string().min(1, "Required"),
    postcode: z.number(),
    country: z.string().min(1, "Required"),
  }),
  price: z.number(),
  thumbnail: z
    .object({
      dataURL: z.string(),
    })
    .array()
    .length(1, "You must upload an thumbnail"),
  metadata: z.object({
    propertyType: z.string().min(1, "Required"),
    bedrooms: z
      .object({
        single: z.number(),
        double: z.number(),
        queen: z.number(),
        king: z.number(),
      })
      .refine(
        ({ single, double, queen, king }) => {
          return single + double + queen + king > 0;
        },
        { message: "At least one bedroom is required" }
      )
      .array()
      .min(1, "You must add at least one bedroom"),
    bathrooms: z.number(),
    amenities: z.object({
      wifi: z.boolean(),
      tv: z.boolean(),
      parking: z.boolean(),
      shower: z.boolean(),
      pool: z.boolean(),
      firstAid: z.boolean(),
    }),
    images: z
      .object({
        dataURL: z.string(),
      })
      .array(),
  }),
});

export type Schema = z.infer<typeof schema>;

type Props = {
  id: number;
};

export const UpdateForm = (props: Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { id } = props;
  const data = useGetListingDetailsQuery(id);
  const listing = data.data?.listing as ListingDetails;

  const mutation = useUpdateHostedMutation(id);

  return (
    <Stack mb={5} alignItems="center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(
            async (value) => await mutation.mutateAsync(value)
          )}
        >
          <Box py={{ base: "4", md: "8" }} maxWidth="1000px">
            <Stack spacing="5" divider={<StackDivider />}>
              {/* Basic */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Basic
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Basic information of your listing
                  </Text>
                </Box>
                <BasicCard listing={listing} />
              </Stack>
              {/* Address */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Address
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Your listing address details
                  </Text>
                </Box>
                <AddressCard listing={listing} />
              </Stack>
              {/* Bedroom */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Bedroom
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Setup your beds and their types
                  </Text>
                </Box>
                <BedroomCard listing={listing} />
              </Stack>
              {/* Bathroom */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Bathroom
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Your bathroom quantity
                  </Text>
                </Box>
                <BathroomCard listing={listing} />
              </Stack>
              {/* Amenities */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Amenities
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Choose your listing amenities
                  </Text>
                </Box>
                <AmenitiesCard listing={listing} />
              </Stack>
              {/* Thumbnail */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Thumbnail
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Upload your listing Thumbnail
                  </Text>
                </Box>
                <UploadCard isMultiple={false} listing={listing} />
              </Stack>
              {/* Images */}
              <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={{ base: "5", lg: "8" }}
                justify="space-between"
              >
                <Box flexShrink={0} width="280px">
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    Images
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Upload your listing other images
                  </Text>
                </Box>
                <UploadCard isMultiple={true} listing={listing} />
              </Stack>
            </Stack>
            <Stack spacing={10} pt={2}></Stack>
          </Box>
          <Divider />
          <Flex mt={5} justifyContent="end">
            <Button
              loadingText="Submitting"
              size="lg"
              isLoading={isSubmitting}
              type="submit"
              // onClick={() =>
              //   console.log(methods.getValues(), methods.formState.errors)
              // }
            >
              Submit
            </Button>
          </Flex>
        </form>
      </FormProvider>

      {/* <DevTool control={control} /> */}
    </Stack>
  );
};
