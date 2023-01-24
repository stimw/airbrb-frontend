import React from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./appRoutes";

export const AppRoutes = () => {
  const element = useRoutes([...appRoutes]);
  return <>{element}</>;
};
