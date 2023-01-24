import { writeReview, Review } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useWriteReviewMutation = (
  bookingId: number,
  listingId: number
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Review) => writeReview(bookingId, listingId, data),
    {
      onSuccess: () => {
        popSuccessToast("Reviewed successfully");
        queryClient.invalidateQueries(["listings"]);
        queryClient.invalidateQueries(["listings", listingId]);
        queryClient.invalidateQueries(["bookings"]);
      },
      onError: () => {
        popErrorToast("Review failed, please try again");
      },
    }
  );
};
