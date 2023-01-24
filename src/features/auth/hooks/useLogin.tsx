import { login } from "../api";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "../types";
import { popErrorToast } from "@/utils/toasts";
import { useNavigate } from "react-router-dom";
import { loginAtom } from "@/App";
import { useAtom } from "jotai";
import tokenHandler from "@/utils/tokenHandler";

export const useLogin = () => {
  const navigate = useNavigate();
  const [, setLogin] = useAtom(loginAtom);
  return useMutation((data: LoginRequest) => login(data), {
    onSuccess: (data, variables: LoginRequest) => {
      navigate("/");
      setLogin(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      tokenHandler.setToken(variables.email, data.data.token as string);
    },
    onError: () => {
      popErrorToast("Login failed, check your email and password");
    },
  });
};
