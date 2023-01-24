import React from "react";

import { useGetListingsQuery } from "@/features/listing/hooks/useGetListingsQuery";
import { useGetListingsDetailsQueries } from "@/features/listing/hooks/useGetListingDetailsQuery";
import { useNavigate, Navigate } from "react-router-dom";
import { MainLayout } from "@/components";
import {
  Box,
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Button,
} from "@chakra-ui/react";
import { HostedCard } from "@/features/listing/components/ListingCard/HostedCard";
import { AddIcon } from "@chakra-ui/icons";
import tokenHandler from "@/utils/tokenHandler";
import { ListingDetails, Listings } from "../types";
import { isLoginAtom } from "@/App";
import { useAtom } from "jotai";

export const HostedListings = () => {
  const { data: listingList, isLoading, isSuccess } = useGetListingsQuery();
  const responseList = useGetListingsDetailsQueries(
    listingList?.map((listing) => listing.id) || []
  );
  const listings = responseList.map(
    (data) => data.data?.listing
  ) as ListingDetails[];
  const listingsWithId = listings.map((listing, index) => ({
    ...listing,
    id: (listingList as Listings)[index].id,
  }));

  const navigate = useNavigate();

  const currUser = tokenHandler.getToken().user;

  const [isLogin] = useAtom(isLoginAtom);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <MainLayout>
        <Stack flex={1} mt={2}>
          <Flex justifyContent="space-between">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/")}>
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink>Hosted Listings</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button
              name="new-listing-button"
              onClick={() => navigate("/hostedlistings/create")}
              leftIcon={<AddIcon />}
              variant="link"
            >
              New Listing
            </Button>
          </Flex>
          <Divider mt={2} />
          <Flex
            alignItems="center"
            direction="column"
            flex={1}
            w="full"
            maxW={900}
            alignSelf="center"
          >
            {listingsWithId
              .filter((l) => l.owner === currUser)
              .map((listingDetails, index) => (
                <Box key={listingList[index].id} w="full">
                  <HostedCard listing={listingDetails} />
                  <Divider mt={2} />
                </Box>
              ))}
          </Flex>
        </Stack>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box w="full">error</Box>
    </MainLayout>
  );
};
