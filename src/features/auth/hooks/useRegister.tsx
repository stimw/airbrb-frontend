import { register } from "../api";
import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "../types";
import { popErrorToast } from "@/utils/toasts";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation((data: RegisterRequest) => register(data), {
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      popErrorToast("Invalid input");
    },
  });
};
