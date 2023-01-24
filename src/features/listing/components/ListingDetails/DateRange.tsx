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
} from "@chakra-ui/react";

import { ListingDetails } from "@/features/listing/types";

type Props = {
  listing: ListingDetails;
};

export const DateRange = (props: Props) => {
  const { listing } = props;

  return (
    <Stack>
      <Heading fontSize="2xl" flex={1} noOfLines={1} mb={2}>
        Date Available
      </Heading>
      <TableContainer>
        <Table size="sm" colorScheme="gray" variant="striped">
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Start</Th>
              <Th>End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listing.availability.map((a, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{a.startDate}</Td>
                <Td>{a.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
