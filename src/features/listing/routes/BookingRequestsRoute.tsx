import React from "react";
import { useGetListingDetailsQuery } from "@/features/listing/hooks/useGetListingDetailsQuery";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components";
import {
  Box,
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { Bookings, ListingDetails } from "../types";
import { isLoginAtom } from "@/App";
import { useAtom } from "jotai";
import { useGetBookingsQuery } from "../hooks/useGetBookingsQuery";
import { BookingCard } from "../components/Bookings/BookingCard";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { MdToday } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import dayjs from "dayjs";
import { Stat } from "@/components/Stat/Stat";
import { countDaysInDateRangeList } from "@/utils/dateParse";
import { priceFormatter } from "@/utils/listingProcess";

export const BookingRequestsRoute = () => {
  // Hooks
  const listingId = parseInt(
    useParams<{ listingId: string }>().listingId as string,
    10
  );

  const { data: dataListing, isLoading: isLoadinglisting } =
    useGetListingDetailsQuery(listingId);

  const {
    data: dataBooking,
    isLoading: isLoadingBooking,
    isSuccess: isSuccessBooking,
  } = useGetBookingsQuery();

  const navigate = useNavigate();

  const [isLogin] = useAtom(isLoginAtom);

  const listing = dataListing?.listing as ListingDetails;
  const bookings = dataBooking?.data.bookings as Bookings;

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (isLoadinglisting || isLoadingBooking) {
    return <div>Loading...</div>;
  }

  if (isSuccessBooking) {
    const thisBookings = bookings.filter((booking) => {
      return parseInt(booking.listingId) === listingId;
    });

    const stats = [
      {
        icon: RepeatClockIcon,
        label: "Online Time",
        value: `${dayjs().diff(dayjs(listing.postedOn), "day")} days`,
      },
      {
        icon: MdToday,
        label: "Booking days",
        value: `${countDaysInDateRangeList(
          thisBookings
            .filter((tb) => tb.status === "accepted")
            .map((booking) => booking.dateRange)
        )} days`,
      },
      {
        icon: GrMoney,
        label: "Total Profit",
        value: priceFormatter.format(
          thisBookings
            .filter((b) => b.status === "accepted")
            .reduce((acc, curr) => {
              return acc + curr.totalPrice;
            }, 0)
        ),
      },
    ];

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
                <BreadcrumbLink onClick={() => navigate("/hostedlistings")}>
                  Hosted Listings
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>Bookings</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <Divider mt={2} />
          {/* hero */}
          <Box as="section" py={{ base: "4", md: "8" }}>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: "5", md: "6" }}
            >
              {stats.map((stat, id) => (
                <Stat key={id} {...stat} />
              ))}
            </SimpleGrid>
          </Box>
          {/* booking list */}
          <Flex
            alignItems="center"
            direction="column"
            flex={1}
            w="full"
            maxW={900}
            alignSelf="center"
            gap={5}
          >
            {thisBookings.map((booking) => (
              <Flex direction="column" key={booking.id} w="full">
                <BookingCard booking={booking} listing={listing} />
                <Divider mt={5} />
              </Flex>
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
