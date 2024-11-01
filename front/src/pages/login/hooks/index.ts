import { useNavigate } from "react-router-dom";
import { ApplicationError, useAuth } from "../../../shared";
import { useMutation } from "@tanstack/react-query";
import { LoggedInUser, LoginValues, RegisterResponse, RegisterValues } from "../types.ts";
import { loginUser, registerUser } from "../apis";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { handleSetUser } = useAuth();
  return useMutation<LoggedInUser, ApplicationError, LoginValues>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      handleSetUser(data);
      navigate("/home");
    },
  });
};

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, ApplicationError, RegisterValues>({
    mutationFn: registerUser,

  });
};