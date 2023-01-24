import { publishHostedListing } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";

type PublishMutationProps = {
  availability: {
    startDate: string;
    endDate: string;
  }[];
};

export const usePublishMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (availability: PublishMutationProps) =>
      publishHostedListing(id, availability),
    {
      onSuccess: () => {
        popSuccessToast("Listing published successfully");
        queryClient.invalidateQueries(["listings"]);
        queryClient.invalidateQueries(["listings", id]);
      },
      onError: () => {
        popErrorToast("Publish listing failed, please try again");
      },
    }
  );
};
