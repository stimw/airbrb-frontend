import { useQueries, useQuery } from "@tanstack/react-query";
import { getListingDetails } from "../api";

export const useGetListingDetailsQuery = (id: number) => {
  return useQuery(["listings", id], () => getListingDetails(id));
};

export const useGetListingsDetailsQueries = (ids: number[]) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["listings", id],
      queryFn: () => getListingDetails(id),
    })),
  });
};
