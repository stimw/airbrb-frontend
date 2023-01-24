import React from "react";
import { Badge, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { Booking, ListingDetails } from "@/features/listing/types";
import { useAcceptBookingMutation } from "@/features/listing/hooks/useAcceptBookingMutation";
import { useDeclineBookingMutation } from "@/features/listing/hooks/useDeclineBookingMutation";
import { priceFormatter } from "@/utils/listingProcess";
import { Confirm } from "@/components/Overlay/Confirm";
import { CalendarIcon } from "@chakra-ui/icons";

type Props = {
  listing: ListingDetails;
  booking: Booking;
};

export const BookingCard = (props: Props) => {
  const { booking } = props;

  const { mutate: acceptBookingMutate } = useAcceptBookingMutation(booking.id);
  const { mutate: declineBookingMutate } = useDeclineBookingMutation(
    booking.id
  );

  return (
    <Flex
      py={2}
      px={4}
      direction={{ base: "column", md: "row" }}
      gap={5}
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
      borderRadius="lg"
      flex={1}
      justifyContent="space-between"
    >
      <Stack>
        <Flex alignItems="center" gap={2} mb={2}>
          <CalendarIcon w={8} h={8} />
          <Heading fontSize="2xl">
            {booking.dateRange.startDate} ~ {booking.dateRange.endDate}
          </Heading>
          {booking.status === "pending" ? (
            <Badge colorScheme="yellow" px={2} fontSize="md" rounded="xl">
              Pending
            </Badge>
          ) : booking.status === "accepted" ? (
            <Badge colorScheme="green" px={2} fontSize="md" rounded="xl">
              Approved
            </Badge>
          ) : (
            <Badge colorScheme="red" px={2} fontSize="md" rounded="xl">
              Declined
            </Badge>
          )}
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Text>
            <strong>Owner:</strong> {booking.owner}
          </Text>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Text>
            <strong>Total Price:</strong>{" "}
            {priceFormatter.format(booking.totalPrice)}
          </Text>
        </Flex>
      </Stack>
      {/* action */}
      <Flex
        direction={{ base: "row", lg: "column" }}
        justifyContent={{ base: "space-around", lg: "center" }}
        gap={4}
      >
        <Confirm
          name="Accept"
          title="Confirm"
          message="Are you sure to accept?"
          onConfirm={() => {
            acceptBookingMutate();
          }}
          buttonProps={{
            variant: "outline",
            colorScheme: "gray",
          }}
        />
        <Confirm
          name="Decline"
          title="Warning"
          message="Are you sure to decline?"
          onConfirm={() => {
            declineBookingMutate();
          }}
          buttonProps={{
            variant: "outline",
            colorScheme: "gray",
          }}
        />
      </Flex>
    </Flex>
  );
};
