import { createBooking, CreateBooking } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useCreateBookingMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: CreateBooking) => createBooking(id, data), {
    onSuccess: () => {
      popSuccessToast("Listing booked successfully");
      queryClient.invalidateQueries(["listings"]);
      queryClient.invalidateQueries(["listings", id]);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      popErrorToast("Book listing failed, please try again");
    },
  });
};
