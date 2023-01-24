import React from "react";
import {
  Heading,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Button,
} from "@chakra-ui/react";

import { ListingDetails } from "@/features/listing/types";
import { useGetBookingsQuery } from "@/features/listing/hooks/useGetBookingsQuery";
import { Bookings } from "@/features/listing/types";
import { priceFormatter } from "@/utils/listingProcess";
import tokenHandler from "@/utils/tokenHandler";
import { useDeleteBookingMutation } from "@/features/listing/hooks/useDeleteBookingMutation";

type Props = {
  listing: ListingDetails;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BookingState = (props: Props) => {
  const { data, isLoading } = useGetBookingsQuery();
  const bookings = data?.data.bookings as Bookings;
  const user = tokenHandler.getToken().user;
  const { mutate: deleteBooking } = useDeleteBookingMutation();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const userBookings = bookings.filter((b) => b.owner === user);

  return (
    <Stack>
      <Heading fontSize="2xl" flex={1} noOfLines={1} mb={2}>
        Booking State
      </Heading>
      <TableContainer>
        <Table size="sm" colorScheme="gray" variant="striped">
          <Thead>
            <Tr>
              <Th>Action</Th>
              <Th>Start</Th>
              <Th>End Date</Th>
              <Th>Total Price</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userBookings.map((b, i) => (
              <Tr key={i}>
                <Td>
                  <Button size="xs" onClick={() => deleteBooking(b.id)}>
                    Delete
                  </Button>
                </Td>
                <Td>{b.dateRange.startDate}</Td>
                <Td>{b.dateRange.endDate}</Td>
                <Td>{priceFormatter.format(b.totalPrice)}</Td>
                <Td
                  color={
                    b.status === "pending"
                      ? "orange.500"
                      : b.status === "accepted"
                      ? "teal.500"
                      : "red.500"
                  }
                >
                  {b.status.toUpperCase()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
