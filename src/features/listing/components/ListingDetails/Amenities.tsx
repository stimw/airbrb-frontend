import React from "react";
import { Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { ListingDetails } from "@/features/listing/types";
import { amenitiesToArray } from "@/utils/listingProcess";

import {
  FaWifi,
  FaParking,
  FaTv,
  FaShower,
  FaFirstAid,
  FaSwimmingPool,
} from "react-icons/fa";

type Props = {
  listing: ListingDetails;
};

const whichIcon = (amenity: string) => {
  switch (amenity) {
    case "Wifi":
      return <FaWifi size="30" />;
    case "Parking":
      return <FaParking size="30" />;
    case "TV":
      return <FaTv size="30" />;
    case "Shower":
      return <FaShower size="30" />;
    case "First Aid":
      return <FaFirstAid size="30" />;
    case "Pool":
      return <FaSwimmingPool size="30" />;
    default:
      return <FaWifi size="30" />;
  }
};

export const Amenities = (props: Props) => {
  const { listing } = props;

  const amenitiesName = amenitiesToArray(listing.metadata.amenities);

  return (
    <Stack>
      <Heading fontSize="2xl" flex={1} noOfLines={1} mb={4}>
        What this place offers
      </Heading>
      <SimpleGrid columns={2} spacing={8}>
        {amenitiesName.map((a) => {
          return (
            <Flex key={a} align="center" gap={2}>
              {whichIcon(a)}
              <Text letterSpacing="wider">{a}</Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
