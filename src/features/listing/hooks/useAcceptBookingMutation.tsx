import { acceptBooking } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useAcceptBookingMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => acceptBooking(id), {
    onSuccess: () => {
      popSuccessToast("Booking accepted successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      popErrorToast("Accept booking failed, please try again");
    },
  });
};
