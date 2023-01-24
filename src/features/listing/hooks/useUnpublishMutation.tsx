import { unpublishHostedListing } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useUnpublishMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => unpublishHostedListing(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      queryClient.invalidateQueries(["listings", id]);
      popSuccessToast("Listing unpublished successfully");
    },
    onError: () => {
      popErrorToast("Unpublish listing failed, please try again");
    },
  });
};
