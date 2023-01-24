import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api";

export const useGetBookingsQuery = () => {
  return useQuery(["bookings"], () => getBookings());
};
