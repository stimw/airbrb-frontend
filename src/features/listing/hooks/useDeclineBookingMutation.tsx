import { declineBooking } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useDeclineBookingMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => declineBooking(id), {
    onSuccess: () => {
      popSuccessToast("Booking declined successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      popErrorToast("Decline booking failed, please try again");
    },
  });
};
