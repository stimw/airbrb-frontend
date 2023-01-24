import { useMutation } from "@tanstack/react-query";
import { popErrorToast, popSuccessToast } from "@/utils/toasts";
import { useNavigate } from "react-router-dom";
import { Schema as CreateHostedListingType } from "@/features/listing/components/CreateForm";
import { createHostedListing } from "@/features/listing/api";

export const useCreateListingQuery = () => {
  const navigate = useNavigate();
  return useMutation(
    (data: CreateHostedListingType) => createHostedListing(data),
    {
      onSuccess: () => {
        navigate("/hostedlistings");
        popSuccessToast("Listing created successfully");
      },
      onError: () => {
        popErrorToast("Create listing failed");
      },
    }
  );
};
