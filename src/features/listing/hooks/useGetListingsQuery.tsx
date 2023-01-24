import { useQuery } from "@tanstack/react-query";
import { getListings } from "../api";

export const useGetListingsQuery = () => {
  return useQuery(["listings"], getListings);
};
