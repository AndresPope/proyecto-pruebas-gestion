import { axiosClient } from "../../../shared";

export const logoutFn = async () => {
  await axiosClient.post(`/logout`,null,{withCredentials:true});
};
