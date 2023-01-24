import { updateHostedListing } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";
import { Schema } from "@/features/listing/components/UpdateForm/UpdateForm";
import { useNavigate } from "react-router-dom";

export const useUpdateHostedMutation = (id: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Schema) => updateHostedListing(id, data), {
    onSuccess: () => {
      popSuccessToast("Listing updated successfully");
      queryClient.invalidateQueries(["listings"]);
      queryClient.invalidateQueries(["listings", id]);
      navigate("/hostedlistings");
    },
    onError: () => {
      popErrorToast("Update listing failed, please try again");
    },
  });
};
