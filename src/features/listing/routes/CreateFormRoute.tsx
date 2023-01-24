import { MainLayout } from "@/components/Layout";
import React from "react";
import { CreateForm } from "../components/CreateForm";
import { isLoginAtom } from "@/App";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";

export const CreateFormRoute = () => {
  const [isLogin] = useAtom(isLoginAtom);
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <CreateForm />
    </MainLayout>
  );
};
