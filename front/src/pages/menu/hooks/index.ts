import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "../apis";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared";
import { useSnack } from "../../../components/snack-bar";

export const useLogout = () => {
  const { openSnack } = useSnack();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      handleLogout();
      openSnack("Sesión cerrada correctamente", { severity: "success" });
      navigate("/");
    },
    onError: () => {
      openSnack("Error al cerrar sesión", { severity: "error" });
    },
  });
};