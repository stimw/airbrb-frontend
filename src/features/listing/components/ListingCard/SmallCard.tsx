import React from "react";
import { Box, Image, Badge, Flex, Heading, Link } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { ListingDetailsWithId } from "@/features/listing/types";
import {
  bedroomsToString,
  reviewsAverage,
  amenitiesToString,
  addressToStringShort,
  priceFormatter,
  bathsToString,
} from "@/utils/listingProcess";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type Props = {
  listing: ListingDetailsWithId;
};

export const SmallCard = (props: Props) => {
  const listing = props.listing;
  const navigate = useNavigate();

  return (
    <Flex width={{ base: "100%" }}>
      <Flex
        direction="column"
        maxW={{ base: "100%", md: "sm" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        justifyContent="space-between"
      >
        <Image
          src={listing.thumbnail[0].dataURL}
          alt="thumbnail"
          _hover={{ cursor: "pointer" }}
          objectFit="cover"
          onClick={() => navigate(`/listing/${listing.id}`)}
        />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" bg="brand.500" color="white">
              New
            </Badge>
            <Heading
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
              noOfLines={1}
              mb={1}
              w="full"
            >
              {bedroomsToString(listing.metadata.bedrooms) +
                bathsToString(listing.metadata.bathrooms) +
                amenitiesToString(listing.metadata.amenities) +
                ` in ${addressToStringShort(listing.address)}`}
            </Heading>
          </Box>
          <Link
            as={RouterLink}
            to={`/listing/${listing.id}`}
            mt="1"
            fontWeight="bold"
            lineHeight="tight"
            noOfLines={1}
          >
            {listing.title}
          </Link>
          <Box letterSpacing="wide">
            {priceFormatter.format(listing.price)}
            <Box as="span" color="gray.600" fontSize="sm">
              / night
            </Box>
          </Box>
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    i < reviewsAverage(listing.reviews)
                      ? "gray.700"
                      : "gray.300"
                  }
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {listing.reviews.length} reviews
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
