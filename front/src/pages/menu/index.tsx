import { Paper, Stack, Typography } from "@mui/material";
import { LocalButton } from "../../components/button";
import { useLogout } from "./hooks";
import { useNavigate } from "react-router-dom";


export const PrincipalMenu = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  return (
    <Stack justifyContent={"center"} gap={2} alignItems={"center"} height={"100vh"} direction={"row"}>
      <Paper sx={{
        width: "30vw",
        p: "2rem",
        borderRadius: "1rem",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}>
        <Typography variant={"h5"}>Menu Principal</Typography>
        <Stack gap={1}>
          <LocalButton variant={"outlined"} onClick={() => navigate("/clients")}>Administrar Clientes</LocalButton>
          <LocalButton variant={"outlined"} onClick={() => logout()}>Cerrar Sesión</LocalButton>
        </Stack>
      </Paper>
    </Stack>
  );
};

