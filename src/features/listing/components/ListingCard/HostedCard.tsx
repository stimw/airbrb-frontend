import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { StarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { ListingDetailsWithId } from "@/features/listing/types";
import { useDeleteHostedMutation } from "@/features/listing/hooks/useDeleteHostedMutation";
import {
  upperCaseFirstLetter,
  addressToStringShort,
  bedroomsToString,
  amenitiesToString,
  reviewsAverage,
  priceFormatter,
  bathsToString,
} from "@/utils/listingProcess";
import { useNavigate } from "react-router-dom";
import { Confirm } from "@/components/Overlay/Confirm";
import { PublishModal } from "@/features/listing/components/Misc/PublishModal";
import { useUnpublishMutation } from "@/features/listing/hooks/useUnpublishMutation";

type Props = {
  listing: ListingDetailsWithId;
};

export const HostedCard = (props: Props) => {
  const { listing } = props;
  const deleteMutation = useDeleteHostedMutation(listing.id);
  const navigate = useNavigate();

  const unpublishMutation = useUnpublishMutation(listing.id);

  return (
    <Flex
      py={7}
      px={4}
      direction={{ base: "column", md: "row" }}
      gap={5}
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
      borderRadius="lg"
      flex={1}
    >
      {/* image */}
      <Image
        src={listing.thumbnail[0].dataURL}
        alt="thumbnail"
        h={{ base: "32", md: "40" }}
        w={{ base: "full", md: "80" }}
        alignSelf={{ base: "center", md: "flex-start" }}
        objectFit="cover"
        borderRadius="2xl"
      />
      {/* description */}
      <Stack mt={2} flex={1} w="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            fontSize="sm"
            color="gray.500"
            fontWeight="semibold"
            flex={1}
          >
            {upperCaseFirstLetter(listing.metadata.propertyType)} in{" "}
            {addressToStringShort(listing.address)}
          </Heading>
          {listing.published ? (
            <Confirm
              buttonProps={{
                variant: "link",
                colorScheme: "teal",
                fontWeight: "bold",
                fontSize: "sm",
              }}
              onConfirm={() => unpublishMutation.mutate()}
              name="Published"
              title="Warning"
              message="Are you sure you want to unpublish this listing?"
            >
              <CheckCircleIcon mr={2} />
            </Confirm>
          ) : (
            <PublishModal id={listing.id} />
          )}
        </Flex>
        <Heading fontSize="lg">{listing.title}</Heading>
        <Divider />
        <Heading
          noOfLines={1}
          fontSize="sm"
          color="gray.500"
          fontWeight="semibold"
        >
          {bedroomsToString(listing.metadata.bedrooms) +
            bathsToString(listing.metadata.bathrooms) +
            amenitiesToString(listing.metadata.amenities)}
        </Heading>
        <Flex alignItems="end" flex={1} justifyContent="space-between">
          <Flex alignItems="center" my={2}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    i < reviewsAverage(listing.reviews)
                      ? "brand.500"
                      : "gray.300"
                  }
                />
              ))}
            <Box
              as="span"
              ml="2"
              color="gray.600"
              fontSize="sm"
              fontWeight="semibold"
            >
              {listing.reviews.length} reviews
            </Box>
          </Flex>
          <Heading fontSize="2xl" my={2}>{`${priceFormatter.format(
            listing.price
          )} / night`}</Heading>
        </Flex>
      </Stack>
      {/* price and action */}
      <Flex direction="column" justifyContent="center" gap={4}>
        <Button
          name="edit-button"
          variant="outline"
          colorScheme="gray"
          borderRadius="lg"
          borderWidth="1.5px"
          onClick={() => navigate(`/hostedlistings/${listing.id}/edit`)}
        >
          Edit
        </Button>
        <Confirm
          name="Delete"
          title="Warning"
          message="Are you sure to delete?"
          onConfirm={() => {
            deleteMutation.mutate();
          }}
          buttonProps={{
            variant: "outline",
            colorScheme: "gray",
            borderRadius: "lg",
            borderWidth: "1.5px",
          }}
        />
        <Button
          variant="outline"
          colorScheme="gray"
          borderRadius="lg"
          borderWidth="1.5px"
          onClick={() => navigate(`/hostedlistings/${listing.id}/bookings`)}
        >
          Bookings
        </Button>
      </Flex>
    </Flex>
  );
};
