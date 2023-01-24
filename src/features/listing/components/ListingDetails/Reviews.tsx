import React from "react";
import { ListingDetails } from "../../types";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useAtom } from "jotai";
import { isLoginAtom } from "@/App";
import tokenHandler from "@/utils/tokenHandler";
import { Bookings } from "@/features/listing/types";
import { useGetBookingsQuery } from "@/features/listing/hooks/useGetBookingsQuery";
import { ReviewModal } from "@/features/listing/components/Misc/ReviewModal";

type ReviewProps = {
  review: ListingDetails["reviews"][0];
};

export const ReviewItem = (props: ReviewProps) => {
  const { review } = props;
  return (
    <Stack spacing="2.5">
      <Stack direction="row" spacing="3">
        <Flex direction="row">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < review.rating ? "gray.700" : "gray.300"}
              />
            ))}
        </Flex>
      </Stack>
      <Text>{review.comment}</Text>
      <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="sm">
        by {review.user}
      </Text>
    </Stack>
  );
};

type Props = {
  listing: ListingDetails;
};

export const Reviews = (props: Props) => {
  const { listing } = props;

  const { data, isLoading } = useGetBookingsQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const bookings = data?.data.bookings as Bookings;

  const currUser = tokenHandler.getToken().user;
  const userBookings = bookings.filter(
    (b) => b.owner === currUser && b.status === "accepted"
  );

  return (
    <Box maxW="7xl">
      <Heading fontSize="2xl" flex={1} noOfLines={1} mb={5}>
        Reviews
      </Heading>
      <Stack spacing="12">
        <Box>
          {userBookings.length > 0 ? (
            <ReviewModal
              listingId={parseInt(userBookings[0].listingId)}
              bookingId={userBookings[0].id}
            />
          ) : (
            <Text>You need to book to make a review</Text>
          )}
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          columnGap="12"
          rowGap={{ base: "10", md: "12" }}
        >
          {listing.reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
