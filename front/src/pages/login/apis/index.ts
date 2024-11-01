import { LoggedInUser, LoginValues, RegisterResponse, RegisterValues } from "../types.ts";
import { axiosClient } from "../../../shared";

export const loginUser = async (loginData: LoginValues) => {
  const { data } = await axiosClient.post<LoggedInUser>(`/login`, loginData);
  return data;
};

export const registerUser = async (registerData: RegisterValues) => {
  const { confirmPwd: _, ...rest } = registerData;
  const { data } = await axiosClient.post<RegisterResponse>(`/create-user`, rest);
  return data;
};
