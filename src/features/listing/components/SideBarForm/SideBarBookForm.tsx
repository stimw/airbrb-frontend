import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import { useAtom, atom } from "jotai";
import {
  dateRangePickerToAvailability,
  countDaysInDateRange,
  isDateRangeListOverlapping,
} from "@/utils/dateParse";
import { useGetListingDetailsQuery } from "../../hooks/useGetListingDetailsQuery";
import { useCreateBookingMutation } from "../../hooks/useCreateBookingMutation";
import { useParams } from "react-router-dom";
import { ListingDetails } from "../../types";
import { priceFormatter } from "@/utils/listingProcess";
import { isLoginAtom } from "@/App";
import { popErrorToast } from "@/utils/toasts";

const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const rangeAtom = atom(selectionRange);

export const SidebarBookForm = () => {
  const [range, setRange] = useAtom(rangeAtom);
  const [isLogin] = useAtom(isLoginAtom);

  const { listingId } = useParams<{ listingId: string }>();
  const idNum = parseInt(listingId as string, 10);
  // Get listing
  const { data, isLoading } = useGetListingDetailsQuery(idNum);
  const listing = data?.listing as ListingDetails;

  const createBookingMutation = useCreateBookingMutation(idNum);

  const handleBook = () => {
    if (!isDateRangeListOverlapping(listing.availability, range)) {
      popErrorToast("Date range is not available");
      return;
    }
    const dataRange = dateRangePickerToAvailability(range);
    const days = countDaysInDateRange(dataRange);
    const price = days * listing.price;
    const data = {
      dateRange: {
        startDate: dataRange.startDate,
        endDate: dataRange.endDate,
      },
      totalPrice: price,
    };
    createBookingMutation.mutate(data);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      rounded="2xl"
      justifyContent="center"
      p={4}
    >
      <Flex direction="column" alignItems="center" gap={4}>
        <Flex alignItems="end" gap={1} my={2}>
          <Heading fontSize="2xl" flex={1}>
            {priceFormatter.format(listing.price * countDaysInDateRange(range))}
          </Heading>
          <Text fontSize="lg">total</Text>
        </Flex>
        <Box border="1px" borderColor="gray.200">
          <DateRange
            onChange={(r) => {
              setRange({ ...(r.selection as typeof range) });
            }}
            ranges={[range]}
            rangeColors={["#ff395d"]}
          />
        </Box>
        {isLogin ? (
          <Button
            rounded="2xl"
            p={6}
            w="full"
            _hover={{ bg: "brand.600" }}
            onClick={handleBook}
          >
            Book
          </Button>
        ) : (
          <Button rounded="2xl" p={4} w="full" _hover={{ bg: "brand.600" }}>
            Login to book
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
