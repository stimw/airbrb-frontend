import { deleteHostedListing } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

export const useDeleteHostedMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteHostedListing(id), {
    onSuccess: () => {
      popSuccessToast("Listing deleted successfully");
      queryClient.invalidateQueries(["listings"]);
    },
    onError: () => {
      popErrorToast("Delete listing failed, please try again");
    },
  });
};
