import React from "react";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { bedroomsToString, bathsToString } from "@/utils/listingProcess";

import { ListingDetails } from "@/features/listing/types";
import { addressToString, propertyTypeToString } from "@/utils/listingProcess";
import { FaHome } from "react-icons/fa";
import { FaLocationArrow, FaBed } from "react-icons/fa";

type Props = {
  listing: ListingDetails;
};

export const Title = (props: Props) => {
  const { listing } = props;

  return (
    <Stack>
      <Heading fontSize="2xl" flex={1} noOfLines={1} mb={2}>
        {listing.title}
      </Heading>
      <Flex gap={4}>
        <Flex alignItems="center" gap={2}>
          <FaHome size="20px" />
          <Text fontSize="md" textColor="gray.600">
            {`${propertyTypeToString(listing.metadata.propertyType)}`}
          </Text>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <FaBed size="20px" />
          <Text fontSize="md" textColor="gray.600">
            {bedroomsToString(listing.metadata.bedrooms) +
              bathsToString(listing.metadata.bathrooms)}
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <FaLocationArrow size="20px" />
        <Text fontSize="md" textColor="gray.600">
          {`${addressToString(listing.address)}`}
        </Text>
      </Flex>
    </Stack>
  );
};
