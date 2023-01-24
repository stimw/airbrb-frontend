import React from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { SideBarLayout } from "@/components/Layout";
import { SidebarBook } from "@/features/listing/components/Sidebar/SidebarBook";
import {
  ImageView,
  Title,
  Amenities,
  DateRange,
} from "@/features/listing/components/ListingDetails";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoginAtom } from "@/App";

import { useGetListingDetailsQuery } from "../hooks/useGetListingDetailsQuery";
import { ListingDetails } from "../types";
import { BookingState } from "../components/ListingDetails/BookingState";
import { Reviews } from "../components/ListingDetails/Reviews";
import { ReviewItem } from "../components/ListingDetails/Reviews";

export const ListingDetailRoute = () => {
  const [isLogin] = useAtom(isLoginAtom);
  const { listingId } = useParams<{ listingId: string }>();
  const idNum = parseInt(listingId as string, 10);
  // Get listing
  const { data, isLoading } = useGetListingDetailsQuery(idNum);
  const listing = data?.listing as ListingDetails;

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <SideBarLayout>
      <Box as="main" flex={1}>
        <Flex direction="column" gap={{ base: 4, lg: 8 }} mb={24}>
          <ImageView listing={listing} />
          <Title listing={listing} />
          <Divider />
          {isLogin && <BookingState listing={listing} />}
          <DateRange listing={listing} />
          <Divider />
          <Amenities listing={listing} />
          <Divider />
          {isLogin ? (
            <Reviews listing={listing} />
          ) : (
            <Box maxW="7xl">
              <Heading fontSize="2xl" flex={1} noOfLines={1} mb={5}>
                Reviews
              </Heading>
              <Stack spacing="12">
                <Box>
                  <Text>You need to book to make a review</Text>
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
          )}
        </Flex>
      </Box>
      <SidebarBook />
    </SideBarLayout>
  );
};
