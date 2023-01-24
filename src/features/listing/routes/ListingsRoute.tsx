import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { SideBarLayout } from "@/components/Layout";
import { SidebarSearch } from "@/features/listing/components/Sidebar/SidebarSearch";
import { SmallCard } from "../components/ListingCard/SmallCard";
import { useSearchParams } from "react-router-dom";

import { useGetListingsQuery } from "@/features/listing/hooks/useGetListingsQuery";
import { useGetListingsDetailsQueries } from "../hooks/useGetListingDetailsQuery";
import { ListingDetails, Listings } from "../types";
import { isDateRangeListOverlapping } from "@/utils/dateParse";
import {
  addressToStringBySpace,
  checkNumberBetween,
} from "@/utils/listingProcess";

export const ListingsRoute = () => {
  // Get listings from the backend
  const { data: listingList, isLoading } = useGetListingsQuery();
  const responseList = useGetListingsDetailsQueries(
    listingList?.map((listing) => listing.id) || []
  );
  const [searchParams] = useSearchParams();
  const searchDateRange = searchParams.get("dateRange");
  const searchKeywords = searchParams.get("keywords");
  const searchPriceRange = searchParams.get("priceRange");
  const searchBedroomRange = searchParams.get("bedroomRange");

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const listings = responseList.map(
    (data) => data.data?.listing
  ) as ListingDetails[];
  const listingsWithId = listings.map((listing, index) => ({
    ...listing,
    id: (listingList as Listings)[index].id,
  }));

  let search = "";
  if (searchDateRange) {
    search = "DateRange";
  } else if (searchKeywords) {
    search = "keywords";
  } else if (searchPriceRange) {
    search = "priceRange";
  } else if (searchBedroomRange) {
    search = "bedroomRange";
  }

  let results = listingsWithId;

  switch (search) {
    case "DateRange": {
      const dateRangeArray = searchDateRange?.split(",") as string[];
      const dateRange = {
        startDate: dateRangeArray[0],
        endDate: dateRangeArray[1],
      };
      results = listingsWithId.filter((listing) => {
        return isDateRangeListOverlapping(listing.availability, dateRange);
      });
      break;
    }
    case "keywords": {
      const keywords = searchKeywords?.split(",") as string[];
      results = listingsWithId.filter((listing) => {
        return keywords.some(
          (keyword) =>
            listing.title.toLowerCase().includes(keyword.toLowerCase()) ||
            addressToStringBySpace(listing.address)
              .toLowerCase()
              .includes(keyword.toLowerCase())
        );
      });
      break;
    }
    case "priceRange": {
      const priceRangeArray = searchPriceRange?.split(",") as string[];
      const minPrice = parseInt(priceRangeArray[0]);
      const maxPrice = parseInt(priceRangeArray[1]);
      results = listingsWithId.filter((listing) => {
        return checkNumberBetween(listing.price, minPrice, maxPrice);
      });
      break;
    }
    case "bedroomRange": {
      const bedroomRangeArray = searchBedroomRange?.split(",") as string[];
      const minBedroom = parseInt(bedroomRangeArray[0]);
      const maxBedroom = parseInt(bedroomRangeArray[1]);
      results = listingsWithId.filter((listing) => {
        return checkNumberBetween(
          listing.metadata.bedrooms.length,
          minBedroom,
          maxBedroom
        );
      });
      break;
    }
    default: {
      results = listingsWithId;
    }
  }

  return (
    <SideBarLayout>
      <Box as="main" flex={1}>
        <SimpleGrid columns={{ base: 1, md: 2, "2xl": 3 }} spacing={10}>
          {results
            .filter((listing) => listing.published)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((listing) => (
              <SmallCard key={listing.id} listing={listing} />
            ))}
        </SimpleGrid>
      </Box>
      <SidebarSearch />
    </SideBarLayout>
  );
};
