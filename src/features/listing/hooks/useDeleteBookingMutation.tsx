import { deleteBooking } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useDeleteBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteBooking(id), {
    onSuccess: () => {
      popSuccessToast("Booking deleted successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      popErrorToast("Delete booking failed, please try again");
    },
  });
};
