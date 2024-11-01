import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicationError, axiosClient } from "../../../shared";
import { ClientInput, TClient } from "../types.ts";
import { useSnack } from "../../../components/snack-bar";
import { getErrorMessage } from "../../../shared/ts-error-handling.ts";
import { queryClient } from "../../../main.tsx";

export const useListClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => axiosClient.get<TClient[]>("/list-clients?limit=50&offset=0", { withCredentials: true }),
  });
};

export const useCreateClient = () => {
  const { openSnack } = useSnack();
  return useMutation<TClient, ApplicationError, ClientInput>({
    mutationFn: (client) => axiosClient.post("/create-client", client, { withCredentials: true }),
    onSuccess: () => {
      openSnack("El Cliente ha sido creado con exito", { severity: "success" });
      queryClient.invalidateQueries({ queryKey: ["clients"] }).then();
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      openSnack(message, { severity: "error" });
    },

  });
};

export const useEditClient = () => {
  const { openSnack } = useSnack();
  return useMutation<TClient, ApplicationError, { id: string, input: ClientInput }>({
    mutationFn: (inputData) => axiosClient.put("/edit-client", inputData, { withCredentials: true }),
    onSuccess: () => {
      openSnack("El Cliente ha sido actualizado con exito", { severity: "success" });
      queryClient.invalidateQueries({ queryKey: ["clients"] }).then();
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      openSnack(message, { severity: "error" });
    },

  });
};

export const useDeleteClient = () => {
  const { openSnack } = useSnack();
  return useMutation<unknown, ApplicationError, { id: string }>({
    mutationFn: (inputData) => axiosClient.post("/delete-client", inputData, { withCredentials: true }),
    onSuccess: () => {
      openSnack("El Cliente ha sido eliminado con exito", { severity: "success" });
      queryClient.invalidateQueries({ queryKey: ["clients"] }).then();
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      openSnack(message, { severity: "error" });
    },

  });
};