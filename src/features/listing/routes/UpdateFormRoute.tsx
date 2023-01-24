import { MainLayout } from "@/components/Layout";
import React from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { UpdateForm } from "../components/UpdateForm";
import { useGetListingDetailsQuery } from "../hooks/useGetListingDetailsQuery";
import { popErrorToast } from "@/utils/toasts";
import { isLoginAtom } from "@/App";
import { useAtom } from "jotai";

export const UpdateFormRoute = () => {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const id = parseInt(listingId as string);
  const { data, isLoading, isSuccess } = useGetListingDetailsQuery(id);

  const [isLogin] = useAtom(isLoginAtom);
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    if (Object.keys(data.listing).length === 0) {
      navigate("/");
      popErrorToast("Listing not found");
    }

    return (
      <MainLayout>
        <UpdateForm id={id} />
      </MainLayout>
    );
  }

  return <div>Error: Something went wrong...</div>;
};
